import type { NextPage } from 'next'
import Head from 'next/head'
import { Top } from '@/Sections/Top/Top'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>mokubara. | Realistic Mockups Made Easy</title>
        <meta name="description" content="The easiest way to create amazing mockups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Top />
    </>
  )
}

export default Home
