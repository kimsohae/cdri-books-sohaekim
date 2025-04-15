import { useState } from "react";
import { type BookResp, getBookList, queryKeys } from "@/queries/book";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import PageLayout from "@/components/PageLayout";

export type DetailedQuery = {
  target: string;
  query: string;
};

const INITIAL_DETAILED_QUERY: DetailedQuery = {
  target: "",
  query: "",
};

export default function Page() {
  const [query, setQuery] = useState<string>();
  const [detailedQuery, setDetailedQuery] = useState<DetailedQuery>(
    INITIAL_DETAILED_QUERY
  );

  const searchParam = {
    query: query || detailedQuery?.query,
    target: detailedQuery?.target,
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage: BookResp) => {
      return lastPage.nextPage;
    },
    queryKey: queryKeys.search(searchParam),
    queryFn: ({ pageParam }) =>
      getBookList({ ...searchParam, page: pageParam }),
    enabled: !!(query || detailedQuery.query),
    placeholderData: keepPreviousData,
  });

  const books = data?.pages.flatMap((page) => page.documents) || [];
  const totalCount = data?.pages[0].meta.total_count;

  /** 검색 : detailed query 초기화 */
  const onSearch = (value: string) => {
    setDetailedQuery(INITIAL_DETAILED_QUERY);
    setQuery(value);
  };

  /** 상세 검색 : query 초기화 */
  const onSearchDetail = (value: DetailedQuery) => {
    setQuery("");
    setDetailedQuery(value);
  };

  return (
    <PageLayout
      type="search"
      books={books}
      totalCount={totalCount}
      search={{ onSearch, onSearchDetail }}
      pagination={{ hasNextPage, fetchNextPage }}
    />
  );
}
