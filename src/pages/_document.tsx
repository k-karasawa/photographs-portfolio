import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* 基本的なメタタグ */}
        <meta charSet="utf-8" />
        {/* viewport metaタグは_document.jsでは使用せず、_app.tsxに移動 */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* ファビコン関連 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/sakuya-pwa.jpg" />
        <link rel="icon" type="image/jpeg" sizes="192x192" href="/sakuya-pwa.jpg" />
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
        />
        
        {/* デフォルトのOGP設定 - 各ページで上書き可能 */}
        <meta property="og:site_name" content="咲矢弓道具 | 矢のオーダーメイド" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="antialiased bg-white text-[#333333]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
