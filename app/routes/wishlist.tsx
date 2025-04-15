import PageLayout from "@/components/PageLayout";
import { WISHLIST } from "@/lib/constants";
import { LocalStorageUtility } from "@/lib/utils";
import {
  getPagenatedWishlist,
  queryKeys,
  type Book,
  type BookResp,
} from "@/queries/book";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CERTICOS BOOKS" },
    { name: "description", content: "CERTICOS BOOKS" },
  ];
}

export default function Page() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: (lastPage: BookResp) => {
      return lastPage.nextPage;
    },
    queryKey: queryKeys.wishList,
    queryFn: ({ pageParam }) => getPagenatedWishlist(pageParam),
  });

  const books = data?.pages.flatMap((page) => page.documents);
  const totalCount = data?.pages[0].meta.total_count;

  return (
    <PageLayout
      type="wishlist"
      books={books}
      totalCount={totalCount}
      pagination={{ hasNextPage, fetchNextPage }}
    />
  );
}
