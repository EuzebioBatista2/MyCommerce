import Head from "next/head"
import Loading from "./components/assets/Loading"
import FormAuth from "./components/assets/FormAuth"
import Link from "next/link"
import Footer from "./components/template/Footer"

export default function Register() {
  return (
    <main className={`flex w-screen h-screen min-h-[650px] bg-gray-100 bg-[url('/background.png')]`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <Loading />
        <div className="flex flex-col w-full items-center justify-center h-full px-4 gap-4">
          <h1 className="font-semibold text-2xl mt-2">Cadastro de conta</h1>
          <FormAuth type="register" />
          <p className="text-sm mt-4">
            Já possui conta? faça um login clicando <Link href={'/'} className="text-blue-700"><strong>aqui</strong></Link>
          </p>
        </div>
        <div className="flex w-full items-end justify-center h-20">
          <Footer />
        </div>
      </div>
    
    </main>
  )
}