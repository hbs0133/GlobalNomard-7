import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2e58a808f072cda625ba7cd5ea3fd1a6&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        />
        <div id="modal-root" />
      </body>
    </Html>
  );
}
