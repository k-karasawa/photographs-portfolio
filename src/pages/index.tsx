import type { NextPage } from 'next'
import Head from 'next/head'
import { Top } from '@/Sections/Top/Top'
import { CustomOrderSection } from '@/Sections/Custom/Custom'
import { Gallery } from '@/Sections/Gallery/Gallery'
import { Ranking } from '@/Sections/Ranking/Ranking'
import { OtherSection } from '@/Sections/Other/OtherSection'
import { NewArrival } from '@/Sections/NewArrival/NewArrival'
import { Layout } from '@/components/Layout'
import { galleryImages, galleryImageName, galleryImageAlt } from '@/Sections/Gallery/galleryData'

const Home: NextPage = () => {
  const siteUrl = 'https://gallery.sakuya-kyudogu.jp'
  const ogImageUrl = `${siteUrl}/sakuya-order-ogp.jpg`
  // 検索上の役割を「柄・色・好み」系（本店と重複しない語）に寄せる。
  // 「オーダーメイド」「デザイン」は本店 /order_made が上位のため主役から外す。
  const pageTitle = '弓道の矢 柄・色の組み合わせ作例集 | 咲矢弓道具 オーダー矢ギャラリー'
  const pageDescription = '弓道の矢を「見た目」で選ぶための作例ギャラリー。とんぼ・桜・中白など羽根の柄と、糸・和紙の色の組み合わせ作例15点を写真で紹介。おしゃれでかっこいいオーダー矢、名前入れなどのカスタマイズは咲矢弓道具にお任せください。'

  return (
    <Layout title={pageTitle}>
      {/* 検索エンジン用メタタグとOGPはLayoutで基本設定されているため、ここではページ固有の設定のみ追加 */}
      <Head>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="弓道,矢,柄,色,組み合わせ,作例,おしゃれ,かっこいい,名前入れ,羽根,和紙,オーダー矢,咲矢弓道具" />
        <link rel="canonical" href={siteUrl} />
        
        {/* OGP (Open Graph Protocol) タグ */}
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card 追加情報 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />

      {/* 構造化データ - JSON-LD
          next/script はクライアント側で注入されサーバー出力 HTML に含まれないため、
          next/head 内の通常の <script> として出力する */}
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                '@id': siteUrl,
                'name': pageTitle,
                'description': pageDescription,
                'url': siteUrl,
                'image': ogImageUrl,
                'inLanguage': 'ja',
                'publisher': {
                  '@type': 'Organization',
                  'name': '咲矢弓道具',
                  'url': 'https://sakuya-kyudogu.jp',
                  'logo': `${siteUrl}/sakuya-logo.svg`
                }
              },
              // 作例15点を ItemList / ImageObject として記述し、
              // 「柄・色の組み合わせ」で探す画像検索・通常検索の受け皿にする
              {
                '@type': 'ItemList',
                'name': '弓道の矢 柄・色の組み合わせ作例',
                'description': '羽根の柄と糸・和紙の色の組み合わせ作例15点',
                'numberOfItems': galleryImages.length,
                'itemListElement': galleryImages.map((image, index) => ({
                  '@type': 'ListItem',
                  'position': index + 1,
                  'item': {
                    '@type': 'ImageObject',
                    'name': `${galleryImageName(image)}の矢`,
                    'description': image.description,
                    'caption': galleryImageAlt(image),
                    'contentUrl': `${siteUrl}${image.src}`,
                    'keywords': [
                      image.specs.material.fletching,
                      image.specs.material.paper,
                      image.specs.material.shaft,
                    ].join(', '),
                    ...(image.orderUrl ? { 'url': image.orderUrl } : {}),
                  }
                }))
              }
            ]
          })
        }}
      />
      </Head>

      <div className="pt-16">
        <Top />
        <section id="next-section">
          <CustomOrderSection />
        </section>
        <NewArrival />
        <Gallery />
        <OtherSection />
        <Ranking />
      </div>
    </Layout>
  )
}

export default Home
