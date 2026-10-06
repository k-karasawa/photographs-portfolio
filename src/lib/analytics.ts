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
 *   - destination_url: 遷移先URL（クエリパラメータ含む。via=gallery 等の識別パラメータも含まれる）
 *   - destination_path: 遷移先パス
 *   - is_customized: カスタマイズ済みデザイン経由かどうか（?rid=XX が付与されている場合 true）
 *   - customization_id: カスタマイズID（rid 値、未指定時は undefined）
 */

export type CtaLocation =
  | 'hero'
  | 'header'
  | 'header_mobile'
  | 'footer'
  | 'ranking'
  | 'custom'
  | 'other'
  | 'newarrival'
  | 'gallery';

/**
 * 本店側 GA4 で「ギャラリー経由の着地」を識別するためのクエリパラメータ方式。
 *
 *   - 'via'  : `?via=gallery&via_cta=<location>` を付与する（既定）。
 *              GA4 のキャンペーン解析を発火させないため、本店側の既存の
 *              参照元／メディア（Paid Search 等）の帰属を壊さない。
 *              本店 GA4 では「ランディングページ + クエリ文字列」に
 *              `via=gallery` を含むセッションで絞り込める。
 *   - 'utm'  : `utm_source=gallery&utm_medium=referral&utm_content=<location>` を付与する。
 *              本店側で参照元が gallery / referral に上書きされ、
 *              元の広告流入の帰属が切れる点に注意（本店担当と合意の上で切り替える）。
 *
 * ギャラリーと本店はルートドメインの Cookie を共有しているため、
 * パラメータ無しではセッションが引き継がれ、本店側で gallery が参照元として現れない。
 */
const MAIN_SITE_TRACKING_MODE = 'via' as 'via' | 'utm';

const MAIN_SITE_HOST = 'sakuya-kyudogu.jp';

/**
 * 本店（sakuya-kyudogu.jp）への URL に、ギャラリー経由であることを示す
 * 識別パラメータを付与して返す。
 *
 * - 本店以外の URL はそのまま返す
 * - 既存のクエリ（?rid=52 等）は保持する
 * - 既に付与済みの場合は上書きする（二重付与しない）
 */
export const withGalleryTracking = (url: string, location: CtaLocation): string => {
  try {
    const u = new URL(url);
    if (u.hostname !== MAIN_SITE_HOST && !u.hostname.endsWith(`.${MAIN_SITE_HOST}`)) {
      return url;
    }
    if (u.hostname.startsWith('gallery.')) {
      return url;
    }

    if (MAIN_SITE_TRACKING_MODE === 'utm') {
      u.searchParams.set('utm_source', 'gallery');
      u.searchParams.set('utm_medium', 'referral');
      u.searchParams.set('utm_content', location);
    } else {
      u.searchParams.set('via', 'gallery');
      u.searchParams.set('via_cta', location);
    }
    return u.toString();
  } catch {
    return url;
  }
};

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
