import PageLayout from "@/components/PageLayout";
import { useSearchBooksInifinite } from "@/features/book/hooks";

export default function Page() {
  const { data, fetchNextPage, hasNextPage } = useSearchBooksInifinite();
  /** 검색 : detailed query 초기화 */

  return (
    <PageLayout
      type="search"
      books={data.books}
      totalCount={data.totalCount}
      pagination={{ hasNextPage, fetchNextPage }}
    />
  );
}
