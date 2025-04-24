// 미사용 - 주석처리
// export type ApiBookTarget = "title" | "isbn" | "publisher" | "person";

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


export interface BookParam {
    query: string;
    page?: number;
    target?: string;
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


