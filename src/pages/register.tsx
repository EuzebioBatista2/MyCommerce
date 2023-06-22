import Head from "next/head"
import RegisterLayout from "./components/template/RegisterLayout"

export default function Register() {
  return (
    <main className={`flex w-screen h-screen bg-gray-100 bg-[url('/background.png')]`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    
      <RegisterLayout />
    
    </main>
  )
}