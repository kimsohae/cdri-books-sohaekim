import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useSearchBooksInifinite } from "@/features/book/hooks";
import type { BookParam } from "@/features/book/types";

const INITIAL_DETAILED_QUERY: BookParam = {
  target: "",
  query: "",
};

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [detailedQuery, setDetailedQuery] = useState<BookParam>(
    INITIAL_DETAILED_QUERY
  );

  const searchParam = {
    query: query || detailedQuery?.query,
    target: detailedQuery?.target,
  };

  const { data, fetchNextPage, hasNextPage } =
    useSearchBooksInifinite(searchParam);
  /** 검색 : detailed query 초기화 */
  const onSearch = (value: string) => {
    setDetailedQuery(INITIAL_DETAILED_QUERY);
    setQuery(value);
  };

  /** 상세 검색 : query 초기화 */
  const onSearchDetail = (value: BookParam) => {
    setQuery("");
    setDetailedQuery(value);
  };

  return (
    <PageLayout
      type="search"
      books={data.books}
      totalCount={data.totalCount}
      search={{ onSearch, onSearchDetail }}
      pagination={{ hasNextPage, fetchNextPage }}
    />
  );
}
