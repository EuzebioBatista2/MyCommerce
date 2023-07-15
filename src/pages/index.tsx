import Head from 'next/head'
import Loading from './components/assets/Loading'
import Form from './components/assets/FormAuth'
import Image from 'next/image'
import Button from './components/assets/Button'
import Link from 'next/link'
import Footer from './components/template/Footer'
import { IconGoogle } from '../../public/icons/icons'
import { useEffect } from 'react'
import { useLoadingReducer } from '@/store/reducers/loadingReducers/useLoadingReducer'
import { useRouter } from 'next/router'
import { authFirebase } from '../../backend/config'
import { signWithGoogle } from '../../backend/auth/submitLoginWithGoogle'

export const metadata = {
  title: 'Portfolio Euzebio Batista',
  description: 'Pagina web criada para compartilhar meus projetos e criações.'
}


export default function Login() {
  const router = useRouter()
  const { setLoading } = useLoadingReducer()

  async function onStateLogin() {
    const remember = localStorage.getItem('rememberMyAccontMyCommerce')
    if ( remember === "true" ) {
      setLoading(true)
      await authFirebase.onAuthStateChanged((user) => {
        if(user) {
          router.push('/home')
        }
      })
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  useEffect(() => {
    onStateLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className={`flex w-screen h-screen min-h-[650px] bg-gray-100 bg-[url('/background.png')]`}>
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
    
      <div className='flex flex-col items-center justify-center w-full'>
        <Loading />
        <div className="flex items-center justify-center h-40 w-full">
          <div className='h-4/5 w-2/5'>
            <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={160} height={140} priority={true} className='w-auto h-auto' />
          </div>
        </div>
        <div className="flex flex-col w-full items-center justify-center h-full px-4">
          <h1 className="font-semibold text-2xl mt-2">Página de login</h1>
          <Form type="login" />
          <Button color="blue" text="Conta Google" icon={IconGoogle} onClick={() => {signWithGoogle(setLoading, router)}} />
        </div>
        <div className="flex flex-col w-full relative my-3 h-56 gap-2 px-4">
          <ul className="flex flex-col items-start justify-start text-sm text-gray-600 gap-2">
            <li>Esqueceu sua <Link href={'/forgotPassword'} className="text-blue-700"><strong>senha</strong></Link>?</li>
            <li>Não tem conta? <Link href={'/register'} className="text-blue-700"><strong>criar</strong></Link></li>
            <li>Acesse meu PORTFOLIO clicando: <Link href={'#'} className="text-blue-700"><strong>aqui</strong></Link></li>
          </ul>
        </div>
        <div className="flex w-full items-end justify-center h-20">
          <Footer />
        </div>
      </div>
    </main>
  )
}
