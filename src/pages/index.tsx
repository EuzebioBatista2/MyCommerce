import Head from 'next/head'
import LoginLayout from './components/template/LoginLayout'

export const metadata = {
  title: 'Portfolio Euzebio Batista',
  description: 'Pagina web criada para compartilhar meus projetos e criações.'
}


export default function Home() {
  return (
    <main className={`flex w-screen h-screen bg-gray-100 bg-[url('/background.png')]`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    
      <LoginLayout />
      
    </main>
  )
}
