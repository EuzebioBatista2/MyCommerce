
import Head from 'next/head'
import ForgotMyPasswordLayout from './components/template/ForgotMyPasswordLayout'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['100', '200', '300', '600', '700', '800'],
  subsets: ['latin']
})


export default function ForgotPassword() {
  return (
    <main className={`${poppins.className} flex w-screen h-screen bg-gray-100 bg-[url('/background.png')]`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    
      <ForgotMyPasswordLayout />
      
    </main>
  )
}
