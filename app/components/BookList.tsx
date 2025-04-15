import { useEffect, useState } from "react";
import { useUpdateWishlist } from "@/lib/hooks";
import { WISHLIST } from "@/lib/constants";
import { generateBookId, LocalStorageUtility } from "@/lib/utils";
import Button from "@/components/Button";
import ArrowIcon from "@/components/icon/ArrowIcon";
import LikeIcon from "@/components/icon/LikeIcon";
import { type Book } from "@/queries/book";
import type { PageType } from "@/components/PageLayout";

interface Props {
  bookList: Book[];
  type: PageType;
}
export default function BookList({ bookList, type }: Props) {
  const { removeWishList } = useUpdateWishlist();
  const [openedCardId, setOpenedCardId] = useState<string>("");
  const [wishBookIds, setWishBookIds] = useState<Set<string>>(
    new Set<string>()
  );

  /**
   * 상세보기 클릭 시, 아코디언 확장
   * @param id book ID (ISBN + 책제목)
   */
  const onClickDetail = (id: string) => {
    if (openedCardId === id) {
      setOpenedCardId("");
    } else {
      setOpenedCardId(id);
    }
  };

  /**
   * 구매하기 클릭 시, 새 탭으로 열기
   * @param url Daum 책 링크
   */
  const onClickBuy = (url: string) => {
    window.open(url, "_target");
  };

  /**
   * 하트 아이콘 클릭 시, 찜한 책 리스트 추가/삭제
   * @param book
   */
  const onClickWish = (book: Book) => {
    const wishList = LocalStorageUtility.getItem<Book[]>(WISHLIST, []);
    const bookId = generateBookId(book);
    const isWished = wishBookIds.has(bookId);

    // [1. 로컬스토리지 업데이트]
    // 찜한 책이면      wishList에서 찜한 책을 제거
    // 찜한 책이 아니면  wishList 맨 앞에 찜한 책을 추가
    const updatedList = isWished
      ? wishList.filter((item: Book) => !(generateBookId(item) === bookId))
      : [book, ...wishList];
    LocalStorageUtility.setItem(WISHLIST, updatedList);

    // [2. queryData 업데이트]
    // wishlist 페이지에서만 적용
    // react-query에서 관리하는 Data 상태를 업데이트한다.
    if (type === "wishlist") {
      removeWishList(bookId);
    }

    // [3. 찜한 책 판별용 Set 업데이트]
    const newSet = new Set(wishBookIds);
    if (isWished) {
      newSet.delete(bookId);
    } else {
      newSet.add(bookId);
    }
    setWishBookIds(newSet);
  };

  useEffect(() => {
    // bookList.map에서, wishList에 속한 책인지 빠르게 확인하기 위해
    // 자료구조를 Array에서 Set으로 변환 (bookId를 값으로 가지는 Set 생성)
    const wishList = LocalStorageUtility.getItem<Book[]>(WISHLIST, []);
    const newSet = new Set(wishList.map((item: Book) => generateBookId(item)));
    setWishBookIds(newSet);
  }, []);

  return (
    <>
      {bookList.map((book) => {
        const { title, contents, price, sale_price, thumbnail, authors, url } =
          book;
        // bookId   => book 키값
        // isOpened => 아코디언 확장 여부
        // isOnSale => 할인 여부. sale_price가 0 이상이면 할인 중으로 판단
        // replacedContent => 소개글 줄바꿈 처리
        // isWished => 찜한 책 판별
        // finalPrice => 할인여부 적용 후 가격
        const bookId = generateBookId(book);
        const isOpened = openedCardId === bookId;
        const isOnSale = book.sale_price >= 0;
        const replacedContent = contents.replace("  ", "\n\n");
        const isWished = wishBookIds.has(bookId);
        const finalPrice = (isOnSale ? sale_price : price).toLocaleString();

        return (
          <article
            key={bookId}
            className={`relative w-full flex justify-between border-b border-ghostGray items-center animate-default pr-[16px] overflow-hidden ${
              isOpened
                ? `h-[344px] pl-[54px] pt-[26px] pb-[40px]`
                : "h-[100px] pl-[48px] pt-[16px] pb-[16px]"
            }  `}
          >
            <div className="flex h-full items-center">
              <div
                className={`relative flex-shrink-0 animate-default ${
                  isOpened
                    ? "mr-8 w-[210px] h-[280px]"
                    : "mr-12 w-[48px] h-[68px]"
                }`}
              >
                <img
                  src={thumbnail || "/unfound.webp"}
                  alt={bookId}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <LikeIcon
                  role={"button"}
                  onClick={() => onClickWish(book)}
                  className={`absolute animate-default cursor-pointer ${
                    isOpened
                      ? "top-[8px] right-[8px] w-[24px]"
                      : "top-[0px] right-[0px] w-[12px]"
                  }`}
                  type={isWished ? "fill" : "stroke"}
                />
              </div>

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
                  <div className="title3 mr-4">{title}</div>
                  <span className="body2 text-txt-secondary whitespace-pre-line">
                    {authors.join(", ")}
                  </span>
                </div>
                <div className={`text-txt-primary ${isOpened ? "" : "hidden"}`}>
                  <div className={"mb-[12px] body2 font-bold"}>책 소개</div>
                  <p className="small whitespace-pre-line">{replacedContent}</p>
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
                  className={`title3 mr-14 w-max ${isOpened ? "hidden" : ""}`}
                >
                  {finalPrice}원
                </span>
                <div className={`flex justify-end gap-2 w-[240px] `}>
                  <Button
                    className={`w-[116px] ${isOpened ? "hidden" : ""}`}
                    onClick={() => onClickBuy(url)}
                  >
                    구매하기
                  </Button>
                  <Button
                    color="lightGray"
                    className="w-[116px]"
                    onClick={() => {
                      onClickDetail(bookId);
                    }}
                  >
                    <span className="mr-[5px]">상세보기</span>
                    <ArrowIcon className={`${isOpened ? "rotate-180" : ""}`} />
                  </Button>
                </div>
              </div>
              <div className={`${isOpened ? "" : "hidden"}`}>
                <div className="grid mb-[28px] mr-[4px] items-center grid-cols-[1fr_auto] gap-[4px] ">
                  <span className="text-right small text-txt-subtitle">
                    원가
                  </span>
                  <span
                    className={`${
                      isOnSale ? "font-light line-through" : "title3"
                    }`}
                  >
                    {price.toLocaleString()}원
                  </span>
                  {isOnSale && (
                    <>
                      <span className="text-right small text-txt-subtitle">
                        할인가
                      </span>
                      <span className="title3">
                        {sale_price.toLocaleString()}원
                      </span>
                    </>
                  )}
                </div>
                <Button className="w-[240px]" onClick={() => onClickBuy(url)}>
                  구매하기
                </Button>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
