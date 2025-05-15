
## SEO設定について
### OGP画像設定
プロジェクトではOGP（Open Graph Protocol）画像を使用して、SNSでのリンク共有時の表示を最適化しています。
#### OGP画像の仕様

- **ファイル場所**: `/public/sakuya-order-ogp.jpg`
- **推奨サイズ**: 1200×630ピクセル
- **アスペクト比**: 1.91:1
- **ファイル形式**: JPG または PNG
- **ファイルサイズ**: 5MB以下

#### デザインのポイント

- 主要なコンテンツやテキストは中央付近に配置（各SNSでのトリミングを考慮）
- サイト名や象徴的な要素を含める
- テキストを含める場合は読みやすさを確保
- LINEやGoogle、Facebook、Twitter(X)などの各プラットフォームで表示エリアが異なる点に注意

#### OGP画像の更新方法

1. デザインツール（PhotoshopやCanvaなど）で1200×630ピクセルの画像を作成
2. 画像を `/public/ogp-image.jpg` として保存
3. 変更をデプロイして反映

### Google Analytics / Google Tag Manager

Google Analyticsを設定する場合は、`src/pages/_app.tsx`の以下の部分を編集してください：

```typescript
// Google AnalyticsのID
window.gtag('config', 'G-XXXXXXXXXX', {
  page_path: url,
});

// Google Tag ManagerのID
'https://www.googletagmanager.com/gtm.js?id='+i+dl
```

IDをそれぞれ実際のものに置き換えてください。

### PWA設定

プロジェクトはPWA（Progressive Web App）としても機能するように設定されています。

#### PWAアイコンの仕様

- **ファイル場所**: `/public/sakuya-pwa.jpg`
- **使用場所**: 
  - ホーム画面アイコン
  - Apple Touch Icon
  - ファビコン（一部ブラウザ）
- **推奨サイズ**: 512×512ピクセル（大きいサイズを用意し、自動的にリサイズされます）
- **ファイル形式**: 透過が必要な場合はPNG、それ以外はJPGも可

#### PWA機能の更新方法

1. アイコン画像を変更する場合は、新しい画像を `/public/sakuya-pwa.jpg` として保存
2. PWAの設定を変更する場合は、`/public/site.webmanifest` ファイルを編集
3. Service Workerの設定を変更する場合は、`/public/serviceworker.js` を編集
4. 変更をデプロイして反映

### Service Worker

アプリケーションはPWA（Progressive Web App）機能を備えており、Service Workerを使用してオフライン機能やキャッシュ管理を行っています。

#### Service Workerの機能

- **キャッシュ管理**: 重要なアセットをキャッシュして高速に読み込み
- **オフライン対応**: インターネット接続がない場合でも基本機能を提供
- **パフォーマンス向上**: キャッシュファーストの戦略でロード時間を短縮

#### Service Workerのカスタマイズ

Service Workerの設定を変更する場合は、`/public/serviceworker.js` ファイルを編集します。主な設定項目：

- **CACHE_NAME**: キャッシュのバージョン管理用の名前
- **urlsToCache**: 初期にキャッシュするファイルのリスト
- **fetch イベントハンドラ**: リソース取得の戦略を定義

#### 注意事項

- Service Workerのファイル名は必ず `/public/serviceworker.js` (ハイフンなし) を使用してください
- `/service-worker.js` (ハイフンあり) という形式は使用しないでください
