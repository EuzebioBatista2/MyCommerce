import Head from "next/head";

export default function Home() {
  return (
    <main className={`flex w-screen h-screen bg-gray-100 bg-[url('/background.png')]`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    
      <h1>Página de login</h1>    
    </main>
  )
}