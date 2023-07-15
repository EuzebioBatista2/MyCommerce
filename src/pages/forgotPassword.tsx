
import Head from 'next/head'
import Form from "./components/assets/FormAuth";
import Image from 'next/image'
import Footer from './components/template/Footer'
import Loading from './components/assets/Loading';

export default function ForgotPassword() {
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
          <div className="flex items-center justify-center h-1/5 w-full">
            <div className='h-4/5 w-2/5'>
              <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={160} height={140} priority={true} className='w-auto h-auto' />
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center  h-3/5 px-4">
            <div className="flex flex-col text-center gap-3">
              <h1 className="font-semibold text-2xl">Esqueceu sua senha?</h1>
              <h2 className="font-semibol text-base text-gray-800">Insira seu e-mail abaixo.</h2>
              <h3 className="text-sm text-gray-600">*Será enviado um e-mail para confirmar sua autenticação*</h3>
              <h3 className="text-sm text-gray-600">*<strong>OBS</strong>: Só funciona para e-mails existentes*</h3>
            </div>
            <Form type="forgotPassword" />
          </div>
          <div className="flex w-full items-end justify-center h-1/5">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  )
}
