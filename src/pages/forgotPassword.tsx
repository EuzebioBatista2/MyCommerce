
import Head from 'next/head'
import ForgotMyPasswordLayout from './components/template/ForgotMyPasswordLayout'

export default function ForgotPassword() {
  return (
    <main className={`flex w-screen h-screen bg-gray-100 bg-[url('/background.png')]`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    
      <ForgotMyPasswordLayout />
      
    </main>
  )
}
