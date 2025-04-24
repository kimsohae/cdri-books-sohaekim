import React, { useEffect, useRef, useState } from "react";
import { INITIAL_DETAILED_QUERY } from "@/contexts/BookParamContext";
import { useSearchBooksInifinite } from "@/features/book/hooks";
import { LocalStorageUtility } from "@/lib/utils";
import { SEARCH_HISTORY } from "@/lib/constants";
import { useClickOutside } from "@/lib/hooks";
import SearchIcon from "@/components/icon/SearchIcon";
import CancelIcon from "@/components/icon/CancelIcon";

const getUpdatedHistory = (
  searchWord: string,
  history: string[],
  limit = 8
) => {
  // 히스토리에 검색어가 있는 경우, 맨 앞으로 이동
  if (history.includes(searchWord)) {
    return [
      searchWord,
      ...history.filter((item: string) => item !== searchWord),
    ];
  }
  // limit 제한
  if (history.length === limit) {
    return [searchWord, ...history.slice(1, limit - 1)];
  }

  return [searchWord, ...history];
};

interface Props {
  placeholder: string;
}

export default function Search({ placeholder }: Props) {
  const { setBookParam } = useSearchBooksInifinite();
  const searchValueRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>(
    typeof window !== "undefined"
      ? LocalStorageUtility.getItem<string[]>(SEARCH_HISTORY, [])
      : []
  );
  const [isHistoryShown, setIsHistoryShown] = useState<boolean>(false);

  /**
   * 검색 후 실행 함수
   * localStorage, state에 검색기록 저장하고, 검색기록 창 닫음
   * @param searchWord 검색어
   */
  const saveSearchHistory = (searchWord: string) => {
    const updatedHistory = getUpdatedHistory(searchWord, history);
    LocalStorageUtility.setItem(SEARCH_HISTORY, updatedHistory);
    setHistory(updatedHistory);
    setIsHistoryShown(false);
  };

  /**
   * 검색창 KeyDownEventHandler
   * @description searchValueRef 값을 읽고, 값이 있는 경우 검색 실행
   */
  const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchWord = searchValueRef.current?.value;
    const { key } = e;
    // 엔터 시 검색 실행
    if (searchWord !== "" && searchWord && key === "Enter") {
      setBookParam({ query: searchWord });
      saveSearchHistory(searchWord);
    } else if (isHistoryShown && key === "Escape") {
      setIsHistoryShown(false);
    }
  };

  /**
   * 검색창 FocusEventHandler
   * @description 검색창 foucs 시 검색기록 노출
   */
  const onFocusInput = () => {
    setIsHistoryShown(true);
  };

  /**
   * 검색창 ChangeEventHandler
   * @description 검색창에 값이 없는 경우 검색기록 노출
   */
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setIsHistoryShown(true);
    }
  };

  /**
   * 검색기록 클릭 시, 검색 실행
   * @param historyWord
   */
  const onClickHistory = (historyWord: string) => {
    setBookParam({ query: historyWord });
    saveSearchHistory(historyWord);
  };

  /**
   * 검색기록 X 버튼 클릭 시, 검색기록 삭제
   * @param deleteValue
   */
  const deleteHistory = (deleteValue: string) => {
    const updatedHistory = history.filter(
      (item: string) => item !== deleteValue
    );
    LocalStorageUtility.setItem(SEARCH_HISTORY, updatedHistory);
    setHistory(updatedHistory);
  };

  useClickOutside(historyRef, () => {
    setIsHistoryShown(false);
  });

  useEffect(() => {
    return () => {
      setBookParam(INITIAL_DETAILED_QUERY);
    };
  }, []);

  return (
    <div
      ref={historyRef}
      className="relative w-[480px] h-[50px] pl-[10px] pr-[26px] bg-lightGray rounded-[100px] flex items-center gap-[10px] z-[1]"
    >
      <SearchIcon />
      <input
        data-input="overall"
        className="left-[50px] focus:outline-none flex-1 placeholder-txt-subtitle"
        ref={searchValueRef}
        placeholder={placeholder}
        onFocus={onFocusInput}
        onKeyDown={onKeyDownInput}
        onChange={onChangeInput}
      />
      {/** history */}
      {isHistoryShown && history.length > 0 && (
        <div className="absolute top-[0px] left-0 bg-lightGray w-full rounded-t-[28px] rounded-b-[24px] flex flex-col items-center z-[-1] text-txt-subtitle">
          <div className="h-[50px]" />
          {history?.map((item: string) => (
            <div
              key={item}
              className="relative w-full py-[12px] flex items-center"
            >
              <button
                className={`w-full ml-[52px] mr-[50px] text-left whitespace-nowrap overflow-x-hidden focus:outline-none focus:text-txt-primary `}
                onClick={() => onClickHistory(item)}
              >
                {item}
              </button>
              <button
                className="absolute right-[30px]"
                onClick={() => deleteHistory(item)}
              >
                <CancelIcon className="text-black w-[20px] h-[20px]" />
              </button>
            </div>
          ))}
          <div className="h-[14px]" />
        </div>
      )}
    </div>
  );
}
