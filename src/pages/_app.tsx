import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";

// グローバル型宣言を追加
declare global {
  interface Window {
    gtag: (command: string, target: string, config?: object) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // ルート変更時にデータレイヤーを更新
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // GTMがデータレイヤーを通じてページビューを追跡
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'pageview',
          page: url,
        });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Service Workerの登録
  useEffect(() => {
    if (
      typeof window !== 'undefined' && 
      'serviceWorker' in navigator && 
      window.location.hostname !== 'localhost' && 
      process.env.NODE_ENV === 'production'
    ) {
      // 本番環境でのみService Workerを登録
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/serviceworker.js')
          .then(registration => {
            console.log('Service Worker 登録成功:', registration.scope);
          })
          .catch(err => {
            console.error('Service Worker の登録に失敗しました：', err);
          });
      });
    } else if (
      typeof window !== 'undefined' && 
      'serviceWorker' in navigator &&
      process.env.NODE_ENV !== 'production'
    ) {
      // 開発環境では既存のService Workerを解除
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister();
          console.log('開発環境: Service Worker登録解除');
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        {/* viewportのmetaタグを_document.tsxから移動 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* dataLayerの初期化 */}
      <Script
        id="gtm-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
          `,
        }}
      />

      {/* Google Tag Manager - Head */}
      {process.env.NODE_ENV === 'production' && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MHS6M7DV');
            `,
          }}
        />
      )}

      {/* Google Tag Manager - noscript (Body) */}
      {process.env.NODE_ENV === 'production' && (
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHS6M7DV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      )}
      
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
