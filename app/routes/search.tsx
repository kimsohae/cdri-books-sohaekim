import Button from "@/components/Button";
import ArrowIcon from "@/components/icon/ArrowIcon";
import SearchIcon from "@/components/icon/SearchIcon";
import SearchInput from "@/components/SearchInput";
import Spacing from "@/components/Spacing";
import { type ApiBookTarget, type BookResp, getBookList } from "@/queries/book";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [detailedQuery, setDetailedQuery] = useState<string>("");
  const [target, setTarget] = useState<ApiBookTarget>();
  const [openedCardId, setOpenedCardId] = useState<string>("");

  const searchParam = { query: query || detailedQuery, target };

  const { data, refetch, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage: BookResp) => {
      return lastPage.nextPage;
    },
    queryKey: ["bookList", searchParam],
    queryFn: ({ pageParam }) =>
      getBookList({ ...searchParam, page: pageParam }),
    enabled: false,
  });

  // searchValue 변경 시마다 refetch
  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query]);

  const onClickDetail = (cardId: string) => {
    if (openedCardId === cardId) {
      setOpenedCardId("");
    } else {
      setOpenedCardId(cardId);
    }
  };

  const onClickBuy = (url: string) => {
    window.open(url, "_target");
  };

  return (
    <>
      <h2 className="title2">도서 검색</h2>
      <Spacing h={28} />
      <div className="flex">
        <SearchInput
          searchValue={query}
          setSearchValue={setQuery}
          onSearch={refetch}
        />
        <button className="body2 text-txt-subtitle">상세검색</button>
      </div>
      <Spacing h={24} />
      <section>
        <div className="caption ">
          <span className="mr-4">도서 검색 결과</span>
          <span>
            총{" "}
            <span className="text-primary">
              {data ? data.pages[0].meta.total_count.toLocaleString() : 0}
            </span>
            권
          </span>
        </div>
        <Spacing h={36} />
        <div></div>
        {data?.pages.flatMap((page) =>
          page.documents.map((book) => {
            const isOpened = openedCardId === book.isbn;
            const isOnSale = !!(book.sale_price && book.sale_price > 0);
            const replacedContent = book.contents.replace("  ", "\n\n");

            return (
              <article
                key={book.isbn}
                className={`relative w-full flex justify-between border-b border-[#D2D6DA] items-center duration-300 ease-in-out pr-[16px]  overflow-hidden ${
                  isOpened
                    ? `h-[344px] pl-[54px] pt-[26px] pb-[40px]`
                    : "h-[100px] pl-[48px] pt-[16px] pb-[16px]"
                }  `}
              >
                <div className="flex h-full items-center">
                  <img
                    src={book.thumbnail}
                    alt={book.isbn}
                    // className={`${
                    //   isOpened ? "h-[280px] mr-8" : "h-[68px] mr-12 "
                    // }`}
                    className={`h-full ${isOpened ? "mr-8" : "mr-12"}`}
                  />
                  {/* {isOpened ? (
                    <img
                      src={book.thumbnail}
                      alt={book.isbn}
                      className={`h-[280px] mr-8`}
                    />
                  ) : (
                    <img
                      src={book.thumbnail}
                      alt={book.isbn}
                      className={"h-[68px] mr-12"}
                    />
                  )} */}
                  <div
                    className={`flex flex-col h-full ${
                      isOpened ? "justify-start mr-[48px]" : "justify-center"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        isOpened ? "mb-4 mt-[20px]" : ""
                      }`}
                    >
                      <span className="title3 mr-4">{book.title}</span>
                      <span className="body2 text-txt-secondary">
                        {book.authors.join(", ")}
                      </span>
                    </div>
                    <div
                      className={`text-txt-primary ${isOpened ? "" : "hidden"}`}
                    >
                      <div className={"mb-[12px] body-2"}>책 소개</div>
                      <p
                        className="small whitespace-pre-line
"
                      >
                        {replacedContent}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex flex-col  h-full ${
                    isOpened ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`absolute top-0 right-[16px] bg-white flex pt-[26px] pb-[16px]  ${
                      isOpened ? "justify-end" : "items-center"
                    }`}
                  >
                    <span
                      className={`title3 mr-14 w-max ${
                        isOpened ? "hidden" : ""
                      }`}
                    >
                      {(isOnSale
                        ? book.sale_price
                        : book.price
                      ).toLocaleString()}
                      원
                    </span>
                    <div className={`flex justify-end gap-2 w-[240px] `}>
                      <Button
                        className={`w-[116px] ${isOpened ? "hidden" : ""}`}
                        onClick={() => onClickBuy(book.url)}
                      >
                        구매하기
                      </Button>
                      <Button
                        color="lightGray"
                        className="w-[116px]"
                        onClick={() => {
                          onClickDetail(book.isbn);
                        }}
                      >
                        <span className="mr-[5px]">상세보기</span>
                        <ArrowIcon />
                      </Button>
                    </div>
                  </div>
                  <div className={`${isOpened ? "" : "hidden"}`}>
                    <div className="grid mb-[28px] items-center grid-cols-[1fr_auto] gap-[4px]">
                      <span className="text-right small text-txt-subtitle">
                        원가
                      </span>
                      <span
                        className={`${
                          isOnSale ? "font-light line-through" : "title3"
                        }`}
                      >
                        {book.price.toLocaleString()}원
                      </span>
                      {isOnSale && (
                        <>
                          <span className="text-right small text-txt-subtitle">
                            할인가
                          </span>
                          <span className="title3">
                            {book.sale_price.toLocaleString()}원
                          </span>
                        </>
                      )}
                    </div>
                    <Button
                      className="w-[240px]"
                      onClick={() => onClickBuy(book.url)}
                    >
                      구매하기
                    </Button>
                  </div>
                </div>
              </article>
            );
          })
        )}

        <Button color="lightGray" onClick={() => fetchNextPage()}>
          fetch more
        </Button>
      </section>
    </>
  );
}
