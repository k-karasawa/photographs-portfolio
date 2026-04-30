/**
 * Analytics 計測ユーティリティ
 *
 * gallery LP から本店 sakuya-kyudogu.jp への遷移をGA4で計測するための関数群。
 * GTMコンテナ経由ではなく、直接 dataLayer.push / gtag を呼ぶ方式。
 *
 * 計測されるイベント:
 *   - cta_click_to_main: 本店（sakuya-kyudogu.jp）へのCTAクリック
 *
 * イベントパラメータ:
 *   - cta_location: CTAが配置されている場所
 *   - cta_label: CTAのラベル
 *   - destination_url: 遷移先URL（クエリパラメータ含む）
 *   - destination_path: 遷移先パス
 *   - is_customized: カスタマイズ済みデザイン経由かどうか（?rid=XX が付与されている場合 true）
 *   - customization_id: カスタマイズID（rid 値、未指定時は undefined）
 */

type CtaLocation =
  | 'header'
  | 'header_mobile'
  | 'footer'
  | 'ranking'
  | 'custom'
  | 'other'
  | 'newarrival'
  | 'gallery';

interface TrackOutboundClickParams {
  /** 遷移先URL（?rid=XX 等のクエリパラメータが付いていれば自動的にカスタマイズ判定する） */
  url: string;
  /** CTAが配置されている場所の識別子 */
  location: CtaLocation;
  /** CTAのラベル（例: 'オーダーする', 'この矢を作ってみる'） */
  label: string;
}

/**
 * URL から「カスタマイズ済みデザインかどうか」と「カスタマイズID（rid）」を抽出する。
 *
 * 判定ルール:
 *   - `?rid=XX` パラメータが付いていれば「カスタマイズ済み」(is_customized=true)
 *   - `/order_made/kinteki/full/parts` のような詳細パスへの遷移も「カスタマイズ意図」とみなす
 */
const detectCustomization = (url: string): {
  is_customized: boolean;
  customization_id?: string;
} => {
  try {
    const u = new URL(url);
    const rid = u.searchParams.get('rid');
    if (rid) {
      return { is_customized: true, customization_id: rid };
    }
    // rid なしでも /parts などへ直接飛ぶ場合は「カスタマイズ意図あり」と判定
    if (u.pathname.includes('/order_made/kinteki/full/parts')) {
      return { is_customized: true };
    }
    return { is_customized: false };
  } catch {
    return { is_customized: false };
  }
};

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

  const { is_customized, customization_id } = detectCustomization(params.url);

  const eventParams: Record<string, unknown> = {
    cta_location: params.location,
    cta_label: params.label,
    destination_url: params.url,
    destination_path: destinationPath,
    is_customized,
  };

  if (customization_id !== undefined) {
    eventParams.customization_id = customization_id;
  }

  // dataLayer 経由（GTM 連携を将来的に取りやすい）
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'cta_click_to_main',
      ...eventParams,
    });
  }

  // gtag 直接呼び出し（GTM が停止していても発火させるためのフォールバック）
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click_to_main', eventParams);
  }
};
