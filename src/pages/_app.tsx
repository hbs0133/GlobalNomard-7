import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ReactQueryProviders from '@/hooks/useReactQuery';

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReactQueryProviders>
        <Component {...pageProps} />
      </ReactQueryProviders>
    </>
  );
}

export default App;
