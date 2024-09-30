import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    // QueryClientProvider로 전체 애플리케이션을 감싸기
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
