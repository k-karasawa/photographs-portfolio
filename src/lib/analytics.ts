/**
 * Analytics 計測ユーティリティ
 *
 * gallery LP から本店 sakuya-kyudogu.jp への遷移をGA4で計測するための関数群。
 * GTMコンテナ経由ではなく、直接 dataLayer.push / gtag を呼ぶ方式。
 *
 * 計測されるイベント:
 *   - cta_click_to_main: 本店（sakuya-kyudogu.jp）へのCTAクリック
 */

type CtaLocation =
  | 'header'
  | 'header_mobile'
  | 'footer'
  | 'ranking'
  | 'custom'
  | 'other'
  | 'newarrival';

interface TrackOutboundClickParams {
  /** 遷移先URL */
  url: string;
  /** CTAが配置されている場所の識別子 */
  location: CtaLocation;
  /** CTAのラベル（例: 'オーダーする', '矢の選び方'） */
  label: string;
}

/**
 * 本店（sakuya-kyudogu.jp）へのCTAクリックを GA4 に送信する。
 *
 * GA4 の標準イベントではなくカスタムイベント `cta_click_to_main` として送信。
 * この名前で GA4 → 探索 → 自由形式 で集計できる。
 */
export const trackOutboundClick = (params: TrackOutboundClickParams) => {
  if (typeof window === 'undefined') return;

  const destinationPath = (() => {
    try {
      return new URL(params.url).pathname;
    } catch {
      return params.url;
    }
  })();

  // dataLayer 経由（GTM 連携を将来的に取りやすい）
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'cta_click_to_main',
      cta_location: params.location,
      cta_label: params.label,
      destination_url: params.url,
      destination_path: destinationPath,
    });
  }

  // gtag 直接呼び出し（GTM が停止していても発火させるためのフォールバック）
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click_to_main', {
      cta_location: params.location,
      cta_label: params.label,
      destination_url: params.url,
      destination_path: destinationPath,
    });
  }
};
