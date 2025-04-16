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