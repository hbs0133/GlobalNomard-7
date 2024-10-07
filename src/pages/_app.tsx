import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ReactQueryProviders from '@/hooks/useReactQuery';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"
        strategy="afterInteractive"
      />
      <ReactQueryProviders>
        <Component {...pageProps} />
      </ReactQueryProviders>
    </>
  );
}
