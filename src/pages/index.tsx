import type { NextPage } from 'next'
import Head from 'next/head'
import { Top } from '@/Sections/Top/Top'
import { CustomOrderSection } from '@/Sections/Custom/Custom'
import { Gallery } from '@/Sections/Gallery/Gallery'
import { Ranking } from '@/Sections/Ranking/Ranking'
import { OtherSection } from '@/Sections/Other/OtherSection'
const Home: NextPage = () => {
  return (
    <main className="pt-16">
      <Head>
        <title>矢のオーダーメイドシステム | 咲矢弓道具で自分だけの矢を作ろう</title>
        <meta name="description" content="矢のオーダーメイドシステム | 咲矢弓道具で自分だけの矢を作ろう" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
