import BookList from "@/components/BookList";
import BottomObserver from "@/components/BottomObserver";
import NoData from "@/components/NoData";
import DetailSearch from "@/components/search/DeatilSearch";
import Search from "@/components/search/Search";
import Spacing from "@/components/Spacing";
import type { Book, BookParam } from "@/features/book/types";

export type PageType = "search" | "wishlist";
type PageText = {
  title: string;
  caption: string;
  emptyMessage: string;
};

const messageMap: Record<PageType, PageText> = {
  search: {
    title: "도서 검색",
    caption: "도서 검색 결과",
    emptyMessage: "검색 결과가 없습니다.",
  },
  wishlist: {
    title: "내가 찜한 책",
    caption: "찜한 책",
    emptyMessage: "찜한 책이 없습니다.",
  },
};
interface Props {
  books?: Book[];
  type: PageType;
  totalCount?: number;
  pagination: {
    hasNextPage: boolean;
    fetchNextPage: () => void;
  };
  search?: {
    onSearch: (value: string) => void;
    onSearchDetail: (value: BookParam) => void;
  };
}

/**
 * search, wishlist 페이지 공통 레이아웃
 */
export default function PageLayout({
  totalCount,
  books,
  type,
  pagination: { hasNextPage, fetchNextPage },
}: Props) {
  const pageText = messageMap[type];

  return (
    <main className="mt-20 mx-auto w-[960px] pt-20 px-4">
      <h2 className="title2">{pageText.title}</h2>
      {type === "search" && (
        <>
          <Spacing h={28} />
          <div className="flex items-center gap-4">
            <Search placeholder="검색어를 입력하세요" />
            <DetailSearch placeholder="검색어 입력" />
          </div>
        </>
      )}
      <Spacing h={24} />
      <div className="caption">
        <span className="mr-4">{pageText.caption}</span>
        <span>
          총{" "}
          <span className="text-primary">
            {totalCount ? totalCount.toLocaleString() : "0"}
          </span>
          권
        </span>
      </div>
      <Spacing h={36} />
      <section className="relative">
        {books && (
          <>
            {books.length === 0 ? (
              <NoData message={pageText.emptyMessage} />
            ) : (
              <>
                <BookList bookList={books} type={type} />
                <BottomObserver
                  observeCondition={hasNextPage}
                  onObserve={fetchNextPage}
                />
              </>
            )}
          </>
        )}
      </section>
      <Spacing h={36} />
    </main>
  );
}
