import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * QueryClientProviders component
 * Wraps the application with React Query's QueryClientProvider.
 * Provides a single QueryClient instance to manage all queries.
 * Also integrates React Query Devtools for debugging.
 */
export default function QueryClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * Create a QueryClient instance with default options
   * - refetchOnWindowFocus: disables automatic refetch when window is focused
   * - staleTime: sets the time (5 minutes) before data is considered stale
   */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  );

  return (
    // Provide the QueryClient to the entire app
    <QueryClientProvider client={queryClient}>
      {children} {/* Render children components */}
      {/* React Query Devtools for debugging queries */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
