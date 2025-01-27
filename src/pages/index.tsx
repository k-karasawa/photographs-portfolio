import type { NextPage } from 'next'
import Head from 'next/head'
import { Top } from '@/Sections/Top/Top'
import { CustomOrderSection } from '@/Sections/Custom/Custom'
import { Gallery } from '@/Sections/Gallery/Gallery'
import { Ranking } from '@/Sections/Ranking/Ranking'
import { Other } from '@/Sections/Other/Other'
import { FlipCard } from '@/Sections/Other/FlipCard'

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>mokubara. | Realistic Mockups Made Easy</title>
        <meta name="description" content="The easiest way to create amazing mockups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Top />
      <section id="next-section">
        <CustomOrderSection />
      </section>
      <Gallery />
      <Other />
      <FlipCard />
      <Ranking />
    </main>
  )
}

export default Home
