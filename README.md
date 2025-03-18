This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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
3. 変更をデプロイして反映
