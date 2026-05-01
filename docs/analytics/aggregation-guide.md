# 集計指示書（Claude Code 経由）

`cta_click_to_main` イベントを Claude Code から GA4 で集計するための指示書です。
そのままコピペで Claude Code に貼って使えます。

## 前提

- `ga` MCP（Google Analytics MCP）が Claude Code に登録済みであること
- GA4 のカスタムディメンション登録が完了していること（[README](README.md) 参照）
- カスタムディメンション登録から **24〜48時間経過** していること
  （登録直後はデータ蓄積のラグあり）

## 使うプロパティID

| プロパティ | ID | 備考 |
|---|---|---|
| **arrow-ordermade-lp** | **482621306** | メインで使う（gallery LP 用） |
| sakuyakyudogu | 278226080 | クロスドメイン共有先（参考） |

通常は `arrow-ordermade-lp` の数値で十分です。

---

## 📊 定期集計プロンプト集

### 1. 全期間サマリー（最初に見る）

```
arrow-ordermade-lp プロパティ（482621306）で、過去30日の cta_click_to_main の
発火数を、cta_location 別に集計して表で表示して
```

期待される出力例:
| cta_location | クリック数 |
|---|---|
| gallery | 120 |
| newarrival | 65 |
| header | 40 |
| footer | 25 |
| ... | |

---

### 2. 🌟 人気の羽根ランキング（メイン分析）

```
arrow-ordermade-lp プロパティ（482621306）で、過去30日の cta_click_to_main を
customization_id 別に集計して、クリック数の多い順にランキング表示して。
ranking には docs/analytics/rid-to-design-mapping.md を参照して、
rid と羽根の名前の対応も併記してください。
```

期待される出力例:
| 順位 | rid | 羽根の名前 | クリック数 |
|---|---|---|---|
| 1 | 52 | スタンダード黒 | 23 |
| 2 | 65 | グース 冠鷲 | 19 |
| 3 | 53 | とんぼ | 17 |
| ... | | | |

---

### 3. Gallery モーダル経由のみで絞り込み

```
arrow-ordermade-lp プロパティ（482621306）で、cta_location='gallery' に絞り、
過去30日の cta_click_to_main を customization_id 別にランキング集計してください。
docs/analytics/rid-to-design-mapping.md の対応表で羽根の名前を併記してください。
```

→ Gallery 15種類だけのランキングが見られる。

---

### 4. NewArrival 経由のみ

```
arrow-ordermade-lp プロパティ（482621306）で、cta_location='newarrival' に絞り、
過去30日の cta_click_to_main を customization_id 別に集計してください。
（rid=69 = 新商品1 kasuo2、rid=70 = 新商品2 komonnami）
```

---

### 5. カスタマイズ経由 vs 汎用CTA の比較

```
arrow-ordermade-lp プロパティ（482621306）で、過去30日の cta_click_to_main を
is_customized 別に集計してください。
```

期待される出力例:
| is_customized | クリック数 | 比率 |
|---|---|---|
| true | 185 | 73.7% |
| false | 66 | 26.3% |

---

### 6. CTAラベル別の詳細

```
arrow-ordermade-lp プロパティ（482621306）で、過去30日の cta_click_to_main を
cta_label 別にクリック数の多い順で集計してください。
```

→ 全17種類のCTAそれぞれのクリック数が取れる。

---

### 7. 日別推移

```
arrow-ordermade-lp プロパティ（482621306）で、過去30日の cta_click_to_main の
日別の発火数を date ディメンションで集計してください。
```

→ どの日に何件クリックされたかが分かる。曜日傾向や広告投下日の効果測定に使える。

---

### 8. 流入チャネル × CTA配置の交差分析

```
arrow-ordermade-lp プロパティ（482621306）で、過去30日の cta_click_to_main を
sessionDefaultChannelGroup × cta_location でクロス集計してください。
```

→ 「Google広告から来た人は header と gallery のどちらをクリックするか」など分析可。

---

### 9. 月次レポート（締めの分析）

```
arrow-ordermade-lp プロパティ（482621306）について、過去30日の cta_click_to_main を
docs/analytics/rid-to-design-mapping.md を参照しながら、以下のフォーマットで
レポートしてください:

1. 総クリック数とトレンド（前月比較）
2. 人気の羽根 TOP10（rid + 羽根名 + クリック数）
3. Gallery 経由 vs NewArrival 経由 vs その他CTA の比率
4. is_customized=true の比率（カスタマイズ経由率）
5. 注目すべき発見・改善提案

報告は markdown で作成し、必要なら表とグラフ風の表現を使ってください。
```

→ 1コマンドで包括的なレポートが得られる。

---

## 🚀 リアルタイム確認（テスト時など）

### 直近30分以内のクリック確認

```
arrow-ordermade-lp プロパティ（482621306）の run_realtime_report で、
cta_click_to_main の発火数を minutesAgo 別に確認してください。
```

> 注意: リアルタイムレポートでは `cta_label` や `customization_id` などの
> カスタムディメンションは使えません。「何件発火したか」のみ確認できます。
> 詳細は標準レポート（`run_report`）を24〜48時間後に使ってください。

---

## 📝 集計結果の保存

集計結果はファイルに保存してアーカイブしておくと、月次・四半期での比較がしやすくなります。

```
上記の集計結果を docs/analytics/reports/YYYY-MM.md に保存してください。
```

ディレクトリ構造の推奨:
```
docs/analytics/
├── README.md
├── rid-to-design-mapping.md
├── aggregation-guide.md（本ファイル）
└── reports/
    ├── 2026-05.md
    ├── 2026-06.md
    └── ...
```

---

## 🛠 トラブルシュート

### 「`customization_id` が認識されない」エラー

GA4 でカスタムディメンションが未登録です。[README](README.md) の前提条件を確認してください。

### データが0件になる

- カスタムディメンション登録**前**のイベントは集計対象外（登録時点以降のデータが必要）
- 標準レポートは24〜48時間遅延で集計されるため、クリック直後は見えない
- 期間設定が古すぎる（イベント実装は2026-04-30 開始）

### MCP の使い方を忘れた場合

`/Users/k.karasawa/workspace/seo-analytics-mcp-docs` の `04-usage.md` を参照。

---

## 注意点

- カスタムディメンションは GA4 のスコープが「**イベント**」になっていること
- 文字列ベースなので、`is_customized` も「true」「false」の文字列として扱われる
- `customization_id` も「52」「69」などの文字列扱い（数値比較しないこと）
