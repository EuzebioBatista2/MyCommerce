import { Poppins } from 'next/font/google'
import Head from 'next/head'
import Login from './components/template/Login'

const poppins = Poppins({
  weight: ['100', '200', '300', '600', '700', '800'],
  subsets: ['latin']
})


export default function Home() {
  return (
    <main className={`${poppins.className} w-screen`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header>
        <Login />
      </header>
    </main>
  )
}
