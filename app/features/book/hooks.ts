import { useBookParam } from "@/contexts/BookParamContext";
import { getBookList, getPagenatedWishlist } from "@/features/book/api";
import {
  type BookParam,
  type BookResp,
} from "@/features/book/types";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";


const queryKeys = {
  search: (searchParam:BookParam) => ['search', searchParam],
  wishList: ['wishList']
}


export const useSearchBooksInifinite = () => {
  const { bookParam, setBookParam } = useBookParam();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage: BookResp) => {
      return lastPage.nextPage;
    },
    queryKey: queryKeys.search(bookParam),
    queryFn: ({ pageParam }) =>
      getBookList({ ...bookParam, page: pageParam }),
    enabled: !!bookParam.query,
    placeholderData: keepPreviousData,

    throwOnError: (err) => {
      throw new Error(err.message);
    },
  });


  const books = data?.pages.flatMap((page) => page.documents) || [];
  const totalCount = data?.pages[0].meta.total_count;

  return { data: {books, totalCount}, fetchNextPage, hasNextPage, setBookParam};
};

export const useGetWishlistInifinite = () => {
  const { data, hasNextPage, refetch, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage: BookResp) => {
      return lastPage.nextPage;
    },
    queryKey: queryKeys.wishList,
    queryFn: ({ pageParam }) => getPagenatedWishlist(pageParam),
    throwOnError: (err) => {
        throw new Error(err.message);
      },
  });

  const books = data?.pages.flatMap((page) => page.documents);
  const totalCount = data?.pages[0].meta.total_count;

  return { data: { books, totalCount }, fetchNextPage, refetch, hasNextPage };
};

/**
 * QueryClient wishlist 데이터 업데이트
 * wishlist 페이지에서만 사용중
 * 
 * 기존에는 setQueryData를 활용해 데이터 캐시를 수동 업데이트했으나 
 * fetchNextPage 실행 시 페이지네이션이 부정확한 이슈가 있어 
 * invalidateQueries로 전환.
 * setQueryData를 사용하려면
 * fetchNextPage 시 현재 데이터셋의 마지막 인덱스를 파라미터로 받아 다음 페이지를 받아오는 것으로 수정 필요
 */
export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();
  const toggleWishlist = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.wishList });
    // queryClient.setQueryData(
    //   queryKeys.wishList,
    //   (old: { pages: BookResp[] }) => {
    //     const updatedPages = old.pages.map((el) => {
    //       return {
    //         ...el,
    //         meta: {
    //           ...el.meta,
    //           total_count: el.meta.total_count - 1,
    //         },
    //         documents: el.documents.filter(
    //           (item) => {
    //             console.log(generateBookId(item))
    //             return generateBookId(item) !== bookId}
    //         ),
    //       };
    //     });
    //     return { ...old, pages: updatedPages };
    //   }
    // );
  };

//   const addWishList = (book: Book) => {
//     queryClient.setQueryData(
//       queryKeys.wishList,
//       (old: { pages: BookResp[] }) => {
//         const updatedPages = old.pages.map((el, idx) => {
//           return {
//             ...el,
//             meta: {
//               ...el.meta,
//               total_count: el.meta.total_count + 1,
//             },
//             documents: idx === 0 ? [book, ...el.documents] : el.documents,
//           };
//         });
//         return { ...old, pages: updatedPages };
//       }
//     );
//   };

  return { toggleWishlist };
};
