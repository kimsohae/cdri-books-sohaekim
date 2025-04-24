import React, { useRef, useState } from "react";
import { useSearchBooksInifinite } from "@/features/book/hooks";
import { useClickOutside } from "@/lib/hooks";
import Button from "@/components/Button";
import CancelIcon from "@/components/icon/CancelIcon";
import Spacing from "@/components/Spacing";
import ArrowIcon from "@/components/icon/ArrowIcon";

const SEARCH_OPTIONS: Option[] = [
  {
    label: "제목",
    value: "title",
  },
  {
    label: "저자명",
    value: "person",
  },
  {
    label: "출판사",
    value: "publisher",
  },
];

export type Option = {
  label: string;
  value: string;
};

interface Props {
  options?: Option[];
  placeholder: string;
}

/**
 * 상세 검색 컴포넌트
 *
 * 검색 옵션 dropdown, 검색어 input, 검색 버튼
 * @param dropdown 구성할 옵션 목록
 * @param handleSearch  검색 실행 함수
 * @param placeholder   검색어 input 플레이스홀더
 */
export default function DetailSearch({
  options = SEARCH_OPTIONS,
  placeholder,
}: Props) {
  const { setBookParam } = useSearchBooksInifinite();
  const searchValueRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState<Option>(options[0]);
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const [isOptionOpened, setIsOptionOpened] = useState<boolean>(false);

  /**
   * 검색 버튼 ClickEventHandler
   * @description searchValueRef 값을 읽고, 값이 있는 경우 option.value와 함께 검색
   */
  const onClickSearch = () => {
    const serchWord = searchValueRef.current?.value;
    if (serchWord) {
      const searchOption = {
        target: option.value,
        query: serchWord,
      };
      setBookParam(searchOption);
    }
  };

  /** 팝업 토글 : 검색옵션도 함께 닫음*/
  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
    setIsOptionOpened(false);
  };

  /** 검색옵션 토글  */
  const toggleOption = () => {
    setIsOptionOpened(!isOptionOpened);
  };

  useClickOutside(popupRef, () => {
    setIsPopupOpened(false);
  });

  return (
    <div className="relative z-[1]">
      <Button
        size="sm"
        color="lightGray"
        variant="outline"
        onClick={togglePopup}
      >
        상세검색
      </Button>
      {/** 팝업 오픈 시 상세검색 토글(useClickOutside side effect 방지) */}
      {isPopupOpened && (
        <div className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
      )}
      <div
        ref={popupRef}
        className={`absolute mt-[14px] left-1/2 -translate-x-1/2  px-[24px] py-[36px] bg-white rounded-default shadow-md ${
          isPopupOpened ? "block" : "hidden"
        }`}
      >
        <div className="flex gap-1">
          <button
            className="absolute top-[12px] right-[12px]"
            onClick={togglePopup}
          >
            <CancelIcon />
          </button>
          <div className="relative">
            <button
              className="w-[100px] h-[30px] py-[4px] px-[8px] flex items-center justify-between border-b border-ghostGray text-txt-primary font-bold text-[14px] text-left"
              onClick={toggleOption}
            >
              <span>{option.label || placeholder}</span>

              <ArrowIcon
                className={`w-[10px] h-[10px] ${
                  isOptionOpened ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOptionOpened && (
              <div className="absolute bottom-[-64px] w-[100px] flex flex-col absolute  body2 text-txt-subtitle bg-white shadow-sm ">
                {options.map((el) => {
                  if (el.value === option.value) {
                    return <React.Fragment key={el.value} />;
                  }
                  return (
                    <button
                      key={el.value}
                      onClick={() => {
                        setOption(el);
                        toggleOption();
                      }}
                      className="py-[4px] px-[8px] text-left "
                    >
                      {el.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {/* <div className=""> */}
          <input
            data-input="detail"
            className="focus:outline-none w-[208px] border-b border-primary body2 text-txt-subtitle p-[4px]"
            ref={searchValueRef}
            placeholder={placeholder}
          />
          {/* </div> */}
        </div>
        <Spacing h={16} />
        <Button size="sm" onClick={onClickSearch}>
          검색하기
        </Button>
      </div>
    </div>
  );
}
