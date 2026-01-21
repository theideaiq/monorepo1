'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';

/**
 * Global React Query Provider.
 * Configures the QueryClient with default settings for caching and stale times.
 *
 * @param children - App content.
 */
export default function QueryProvider({ children }: { children: ReactNode }) {
  // Ensure QueryClient is created only once per component lifecycle
  // using useState initializer to prevent recreation on re-renders.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR/Next.js, we want to avoid immediate refetching on the client
            // to prevent hydration mismatches and unnecessary network requests.
            // 60 seconds is a balanced default for this application's data volatility.
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
