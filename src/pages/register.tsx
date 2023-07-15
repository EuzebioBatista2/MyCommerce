import Head from "next/head"
import Loading from "./components/assets/Loading"
import FormAuth from "./components/assets/FormAuth"
import Link from "next/link"
import Footer from "./components/template/Footer"

export default function Register() {
  return (
    <main className={`flex w-screen h-screen min-h-[650px] bg-[url('/background.png')] bg-center bg-no-repeat bg-cover`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className='flex w-full h-full'>
        <div className="hidden md:flex md:w-4/6 bg-[url('/cart.jpg')] bg-center bg-no-repeat bg-cover"></div>
        <div className='flex flex-col items-center justify-center w-full md:w-2/6'>
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
      </div>
    </main>
  )
}