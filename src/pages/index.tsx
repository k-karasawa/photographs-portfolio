import type { NextPage } from 'next'
import Head from 'next/head'
import { Top } from '@/Sections/Top/Top'
import { CustomOrderSection } from '@/Sections/Custom/Custom'
import { Message } from '@/Sections/Message/Message'

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
    </main>
  )
}

export default Home
