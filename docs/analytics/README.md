# Analytics 計測・集計ドキュメント

gallery LP（gallery.sakuya-kyudogu.jp）から本店（sakuya-kyudogu.jp）への
CTAクリックを GA4 で計測・集計するためのドキュメント群です。

## 計測の概要

LP上の本店向けCTAリンク（17箇所）をクリックすると、GA4 にカスタムイベント
**`cta_click_to_main`** が送信されます。

このイベントには以下のパラメータが含まれます:

| パラメータ | 内容 | 例 |
|---|---|---|
| `cta_location` | CTAの配置場所 | `gallery`, `header`, `footer`, `newarrival` 等 |
| `cta_label` | CTAのラベル（ユーザーが見たテキスト） | `この矢を作ってみる（1. スタンダード黒）` |
| `destination_url` | 遷移先URL（クエリ含む） | `https://sakuya-kyudogu.jp/order_made?rid=52` |
| `destination_path` | 遷移先パス | `/order_made` |
| `is_customized` | カスタマイズ済みデザイン経由か | `true` / `false` |
| `customization_id` | カスタマイズID（rid 値） | `52`, `69`（カスタマイズ時のみ） |

## 計測されるGA4プロパティ

クロスドメイン計測の設定により、**両方のプロパティ**にイベントが送信されます。

| プロパティ名 | プロパティID | 用途 |
|---|---|---|
| arrow-ordermade-lp | 482621306 | gallery LP 用（メイン） |
| sakuyakyudogu | 278226080 | メインサイト用（クロスドメイン共有先） |

通常は **arrow-ordermade-lp（482621306）** を集計に使えば十分です。

## ドキュメント一覧

| ファイル | 内容 |
|---|---|
| [rid-to-design-mapping.md](rid-to-design-mapping.md) | カスタマイズID（rid）と羽根デザインの対応表 |
| [aggregation-guide.md](aggregation-guide.md) | Claude Code を使った集計の指示書（コピペで使える） |

## 前提条件: GA4 カスタムディメンションの登録

`run_report` で標準レポートとして集計するには、GA4 管理画面で
以下のカスタムディメンションを **両方のプロパティで** 登録しておく必要があります:

| ディメンション名 | スコープ | イベントパラメータ |
|---|---|---|
| CTA配置場所 | イベント | `cta_location` |
| CTAラベル | イベント | `cta_label` |
| カスタマイズ済み | イベント | `is_customized` |
| カスタマイズID | イベント | `customization_id` |

登録手順:
1. GA4 → 管理（歯車アイコン）→ プロパティ列「カスタム定義」
2. 「カスタム ディメンションを作成」で4つ登録
3. 同じ作業をもう一方のプロパティでも実施

> **注意**: カスタムディメンションは登録後のイベントにのみ適用されます。
> 登録前のデータは標準レポートでパラメータ別集計できません。

## 計測実装ファイル

- [`src/lib/analytics.ts`](../../src/lib/analytics.ts) - `trackOutboundClick` 共通関数
- [`src/pages/_app.tsx`](../../src/pages/_app.tsx) - gtag.js の読み込み
- 各 CTA の `onClick` で `trackOutboundClick` を呼び出し

## 関連リンク

- [GA4 管理画面 (arrow-ordermade-lp)](https://analytics.google.com/analytics/web/#/p482621306)
- [GA4 管理画面 (sakuyakyudogu)](https://analytics.google.com/analytics/web/#/p278226080)
