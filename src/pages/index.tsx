import type { NextPage } from 'next'
import Head from 'next/head'
import { Top } from '@/Sections/Top/Top'
import { CustomOrderSection } from '@/Sections/Custom/Custom'
import { Gallery } from '@/Sections/Gallery/Gallery'
import { Ranking } from '@/Sections/Ranking/Ranking'
import { OtherSection } from '@/Sections/Other/OtherSection'
import Script from 'next/script'

const Home: NextPage = () => {
  const siteUrl = 'https://gallery.sakuya-kyudogu.jp'
  const ogImageUrl = `${siteUrl}/sakuya-order-ogp.jpg`
  const pageTitle = '矢のオーダーメイドシステム | 咲矢弓道具で自分だけの矢を作ろう'
  const pageDescription = '咲矢弓道具の矢のオーダーメイドシステムでは、あなただけのオリジナル矢を簡単に作成できます。矢羽の色や矢筈のデザインなど、様々なカスタマイズが可能です。弓道をより楽しむための、世界にひとつだけの矢をご注文ください。'

  return (
    <main className="pt-16">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* 検索エンジン用メタタグ */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="弓道,矢,オーダーメイド,カスタム,矢羽,弓矢,黒鷲,咲矢弓道具" />
        <link rel="canonical" href={siteUrl} />
        
        {/* OGP (Open Graph Protocol) タグ */}
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card 追加情報 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        
        {/* モバイル対応 */}
        <meta name="theme-color" content="#C84C38" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="咲矢弓道具" />
      </Head>

      {/* 構造化データ - JSON-LD */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': pageTitle,
            'description': pageDescription,
            'url': siteUrl,
            'image': ogImageUrl,
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': siteUrl
            },
            'offers': {
              '@type': 'Offer',
              'priceCurrency': 'JPY',
              'availability': 'https://schema.org/InStock'
            },
            'organization': {
              '@type': 'Organization',
              'name': '咲矢弓道具',
              'url': 'https://sakuya-kyudogu.jp',
              'logo': `${siteUrl}/sakuya-logo.svg`
            }
          })
        }}
      />

      <Top />
      <section id="next-section">
        <CustomOrderSection />
      </section>
      <Gallery />
      <OtherSection />
      <Ranking />
    </main>
  )
}

export default Home
