import { useEffect, useRef } from "react";

interface Props {
  onObserve: () => void;
  observeCondition: boolean;
}

/**
 * Intersection Observer API 활용, Infinite Scroll 구현 용도.
 *
 * 뷰포트 안에 bottomRef가 참조한 div가 감지될 경우 onObserve를 실행한다.
 * 만약 observeCondition이 false라면 감지를 중단한다.
 * @param onObserve          observe 시 실행할 함수
 * @param observeCondition   observe 지속 여부
 */
export default function BottomObserver({ onObserve, observeCondition }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onObserve();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerRef && bottomRef.current) {
      if (observeCondition) {
        observerRef.current.observe(bottomRef.current);
      } else {
        observerRef.current.unobserve(bottomRef.current);
      }
    }

    return () => {
      if (bottomRef.current) {
        observerRef.current?.unobserve(bottomRef.current);
      }
    };
  }, [observeCondition]);

  return <div className="absolute bottom-0 w-full h-[10px]" ref={bottomRef} />;
}
