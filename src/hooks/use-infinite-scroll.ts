import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  threshold?: number;
  rootMargin?: string;
}

const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage = false,
  isFetchingNextPage,
  isLoading,
  threshold = 0.5,
  rootMargin = "0px",
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold, rootMargin }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold,
    rootMargin,
  ]);

  return { loadMoreRef };
};

export default useInfiniteScroll;
