
import { generateBookId } from '@/lib/utils';
import { queryKeys, type Book, type BookResp } from '@/queries/book';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, type RefObject } from 'react';


/**
 * 특정 element 외부 클릭 시 함수 실행
 * @param ref      element 지정 ref
 * @param handler  클릭 이벤트 함수
 */
export const useClickOutside = <T extends HTMLDivElement>(
  ref: RefObject<T|null>,
  handler: (event: Event) => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      const el = ref.current;
      if (!el || el.contains((event.target as Node) || null)) {
        return;
      }
      handler(event); // 클릭 이벤트가 element 외부에서 발생한 경우에만 handler 실행.
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

/**
 * QueryClient wishlist 데이터 업데이트
 * wishlist 페이지에서만 사용중
 */
export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();
  const removeWishList = (bookId:string)=>{
    queryClient.setQueryData(queryKeys.wishList, (old: {pages: BookResp[]})=> {
      const updatedPages = old.pages.map((el) => {
        return {
          ...el,
          meta: {
            ...el.meta,
            total_count: el.meta.total_count - 1,
          },
          documents: el.documents.filter(
            (item) => generateBookId(item) !== bookId
          ),
        };
      });
      return { ...old, pages: updatedPages };
    })
  }

  const addWishList = (book:Book)=>{
    queryClient.setQueryData(queryKeys.wishList, (old: {pages: BookResp[]})=> {
      const updatedPages = old.pages.map((el, idx) => {
        return {
          ...el,
          meta: {
            ...el.meta,
            total_count: el.meta.total_count + 1,
          },
          documents: idx === 0 ? [book, ...el.documents]: el.documents,
        };
      });
      return { ...old, pages: updatedPages };
    })
  }

  return {removeWishList, addWishList}
}