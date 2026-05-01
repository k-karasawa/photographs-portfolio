# カスタマイズID（rid）対応表

GA4 の `cta_click_to_main` イベントに含まれる `customization_id`（rid 値）と、
実際の羽根デザインの対応表です。

## 出典

- Gallery 15種類: [`src/Sections/Gallery/galleryData.ts`](../../src/Sections/Gallery/galleryData.ts)
- NewArrival 2種類: [`src/Sections/NewArrival/NewArrival.tsx`](../../src/Sections/NewArrival/NewArrival.tsx)

データを変更したら本ファイルも更新してください。

---

## Gallery セクションの15種類（モーダル経由）

ユーザーが Arrow Gallery セクションの画像をクリックしてモーダルを開き、
「この矢を作ってみる」ボタンを押すと、各 rid 付きで本店に遷移します。

| rid | gallery ID | 羽根の名前 | 主な仕様 | 画像 |
|---:|---:|---|---|---|
| 52 | 1 | スタンダード黒 | ターキー 黒 / ジュラシャフト シルバー / F710 糸 | `/gallery/1.jpg` |
| 53 | 2 | とんぼ | ターキー とんぼ / ジュラシャフト シルバー / W115_松葉緑 和紙 | `/gallery/2.jpg` |
| 54 | 3 | 中白 紫 | ターキー 中白 紫 / ジュラシャフト 茶 / W019_夜菊 和紙 | `/gallery/3.jpg` |
| 55 | 4 | 染色羽根 赤 | ターキー 染色羽根 赤 / ジュラシャフト 黒 / W142_桜 鎌倉彫 和紙 | `/gallery/4.jpg` |
| 56 | 5 | 夜の鹿 | ターキー 夜の鹿 / ジュラシャフト 黒 / w180_雪に結晶 シルバー 和紙 | `/gallery/5.jpg` |
| 57 | 6 | 元白 青 | ターキー 元白 青 / ジュラシャフト シルバー / W008_夜に金鶴 和紙 | `/gallery/6.jpg` |
| 58 | 7 | ゴマ符 深緑 | ターキー ゴマ符 深緑 / ジュラシャフト シルバー / F054 糸 | `/gallery/7.jpg` |
| 59 | 8 | 染色グラデーション茶 元白 | ターキー 染色グラデーション茶 元白 / ジュラシャフト 黒 / W013_水に撫子茶 和紙 | `/gallery/gallery-1.jpg` |
| 60 | 9 | 大鳥7 鶯 | ターキー 大鳥7 鶯 / ジュラシャフト 茶 / W084_紅葉青緑 和紙 | `/gallery/9.jpg` |
| 61 | 10 | 花 | ターキー 花 / ジュラシャフト 黒 / F011 糸 | `/gallery/10.jpg` |
| 62 | 11 | 桜 | ターキー 桜 / ジュラシャフト 茶 / W145_桜ピンク 和紙 | `/gallery/11.jpg` |
| 63 | 12 | 黒鷲染め抜き 蛍 | ゴマ符 青 / 1913 黒 ジュラシャフト / F710 糸 | `/gallery/12.jpg` |
| 64 | 13 | だんぶりこ 黄 | ターキー だんぶりこ 黄 / ジュラシャフト 茶 / F184 糸 | `/gallery/13.jpg` |
| 65 | 14 | グース 冠鷲 | グース 冠鷲 / カーボンシャフト WENEW / F225 糸 | `/gallery/14.jpg` |
| 66 | 15 | 斜閃 カーキ | ターキー 斜閃 カーキ / ジュラシャフト 黒 / W107_緑に黒とんぼ 和紙 | `/gallery/15.jpg` |

GA4 上での `cta_label` の形式:
```
この矢を作ってみる（1. スタンダード黒）
この矢を作ってみる（2. とんぼ）
...
この矢を作ってみる（15. 斜閃 カーキ）
```

`cta_location` は全て `gallery`。

---

## NewArrival セクションの2種類

| rid | 商品名 | cta_label | 画像 |
|---:|---|---|---|
| 69 | 新商品1 (kasuo2) | カスタマイズしてみる（新商品1: kasuo2） | `/arrival/kasuo2.jpg` |
| 70 | 新商品2 (komonnami) | カスタマイズしてみる（新商品2: komonnami） | `/arrival/komonnami.jpg` |

`cta_location` は全て `newarrival`。

---

## カスタマイズなしのCTA（参考）

`is_customized=false` で集計されるCTA。これらには `customization_id` は付きません。

| cta_location | cta_label | 配置 |
|---|---|---|
| header | オーダーする | Header（PC版・モバイル版） |
| header_mobile | オーダーする | Header モバイルメニュー |
| header | 矢の選び方 | Header → /select_guide |
| header_mobile | 矢の選び方 | Header モバイル → /select_guide |
| header | お問い合わせ | Header → /contact |
| header_mobile | お問い合わせ | Header モバイル → /contact |
| footer | オーダーする（CTA） | Footer メインボタン |
| footer | 咲矢弓道具 公式サイト | Footer リンク |
| footer | 矢のオーダーメイドシステム | Footer リンク |
| footer | 矢の選び方 | Footer → /select_guide |
| footer | お問い合わせ | Footer → /contact |
| custom | カスタムオーダーを始める | Custom セクション |
| other | 矢の選び方を学ぶ | Other セクション |
| ranking | オーダーメイドを始める | Ranking セクション（※ parts 直リンクのため `is_customized=true`） |

---

## 更新時の手順

このファイルは `galleryData.ts` や `NewArrival.tsx` の rid を変更した際に
**必ず手動で更新**してください。自動同期はされません。

更新例:
- 新しい羽根デザインを Gallery に追加した場合 → 末尾に行を追加
- 既存の `orderUrl` の rid を変更した場合 → 該当行を編集
- NewArrival の rid を入れ替えた場合 → NewArrival 表を更新
