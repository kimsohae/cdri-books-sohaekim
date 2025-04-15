import { Config } from "@/lib/config";
import { PAGE_SIZE, WISHLIST } from "@/lib/constants";
import { LocalStorageUtility } from "@/lib/utils";


export const queryKeys = {
    search: (searchParam:BookParam) => ['search', searchParam],
    wishList: ['wishList']
}

export type ApiBookTarget = "title" | "isbn" | "publisher" | "person";
export interface BookParam {
    query: string;
    page?: number;
    target?: string;
}

export interface Book {
    title: string;
    contents: string;
    url: string;
    isbn: string;
    authors: string[];
    price: number;
    sale_price: number;
    thumbnail: string;
}

export interface BookResp {
    documents: Book[];
    meta: {
        is_end: boolean;
        pageable_count: number;
        total_count: number;
    };
    nextPage?: number;
}

export const getBookList = async ({
    query,
    target,
    page = 1,
}: BookParam): Promise<BookResp> => {
    const params = new URLSearchParams({
        query,
        page: page.toString(),
        size: PAGE_SIZE.toString()
    });

    if (target) {
        params.set("target", target);
    }

    const response = await fetch(`${Config.API_BASE_URL}?${params.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `KakaoAK ${Config.API_KEY}`,
        },
    });
    const data = await response.json();
    
    // Infinite Query 페이징용: is_end가 아닌 경우, nextPage 생성
    if (!data.meta.is_end) {
        data.nextPage = page + 1;
    }

    return data;
};


/** 
 *  전체 데이터의 n번째 페이지 반환 
 *  getBookList 반환값과 타입 공통화 역할 
 */
 export const getPagenatedWishlist= (page =1, size=PAGE_SIZE):BookResp=> {
    const wishList = LocalStorageUtility.getItem<Book[]>(WISHLIST, []);
  
    const totalCount = wishList.length;
    const startIndex = size * (page - 1) ;
    const endIndex = startIndex + size;
    const pagenatedData = wishList.slice(startIndex, endIndex);
    const is_end = endIndex >= totalCount;
    
    const data:BookResp = {
      documents: pagenatedData,
      meta: {
        is_end,
        pageable_count: Math.floor(totalCount / size),
        total_count: totalCount
      }
    }
  
    if(!is_end) {
      data.nextPage = page + 1;
    }
  
    return data;
  }