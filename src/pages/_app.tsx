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
    // gtag は ('event', name, params) / ('config', id, params) / ('js', date) などを受ける
    gtag: (...args: unknown[]) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // ルート変更時に GA4 へ page_view を手動送信
  // Pages Router では SPA 遷移で page_view が自動発火しないため
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: url,
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

      {/*
        GA4 / Google Tag (gtag.js)

        GTM-MHS6M7DV コンテナはタグが「停止状態」になっており、
        カスタムイベント（cta_click_to_main 等）を GA4 に転送できない。
        そのため GTM を経由せず gtag.js を直接読み込んで運用する。

        この G-THSQWDTECK は Google Tag Manager 上の「Google タグ」グループにより
        以下にも自動で送信される:
          - G-3760NKDJVQ（メインサイト用 GA4、クロスドメイン計測用）
          - AW-11481186384（Google Ads コンバージョン）

        したがって gtag.js 一つで:
          - GA4 (gallery LP 用) page_view / カスタムイベント
          - GA4 (メインサイト用) クロスドメイン計測
          - Google Ads コンバージョン計測
        がすべて維持される。
      */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            id="ga4-bootstrap"
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-THSQWDTECK"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', 'G-THSQWDTECK');
              `,
            }}
          />
        </>
      )}

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
