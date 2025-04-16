import PageLayout from "@/components/PageLayout";
import { useGetWishlistInifinite } from "@/features/book/hooks";

export default function Page() {
  const { data, hasNextPage, fetchNextPage } = useGetWishlistInifinite();

  return (
    <PageLayout
      type="wishlist"
      books={data.books}
      totalCount={data.totalCount}
      pagination={{ hasNextPage, fetchNextPage }}
    />
  );
}
