import type { NextPage } from 'next'
import Head from 'next/head'
import { Top } from '@/Sections/Top/Top'
import { CustomOrderSection } from '@/Sections/Custom/Custom'
import { Message } from '@/Sections/Message/Message'
import { Gallery } from '@/Sections/Gallery/Gallery'
import { Ranking } from '@/Sections/Ranking/Ranking'

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
      <Message />
      <Gallery />
      <Ranking />
    </main>
  )
}

export default Home
