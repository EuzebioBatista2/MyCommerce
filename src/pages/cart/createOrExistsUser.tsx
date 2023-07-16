import Head from "next/head";
import NavProfile from "../components/assets/NavProfile";
import { IconArrowLeft, IconHome } from "../../../public/icons/icons";
import NavMenu from "../components/assets/NavMenu";
import Footer from "../components/template/Footer";
import Link from "next/link";
import { useEffect } from "react";
import Loading from "../components/assets/Loading";
import LinkButton from "../components/assets/LinkButton";
import { authFirebase } from "../../../backend/config";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import NavMenuMd from "../components/assets/NavMenuMd";


// Página responsável por criar usuário em dívida ou levar para página de usuário em dívida
export default function CreateOrExistsUser() {

  const { setLoading } = useLoadingReducer()

  useEffect(() => {
    authFirebase.onAuthStateChanged(async (user) => {
      if (user) {
        setLoading(false)
      } else {
        window.location.href = '/'
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Função responsável por verificar se o check de lembrar conta foi marcado quando a for fechada
    const remember = localStorage.getItem('rememberMyAccontMyCommerce')
    if (remember === "false") {
      const handleBeforeUnload = () => {
        authFirebase.signOut();
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  return (
    <main className={`flex flex-col w-screen h-screen min-h-[650px] bg-gray-100`}>
      <Loading />
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <nav className="w-full h-20 bg-gradient-to-r from-gray-100 to-gray-400">
        <NavProfile />
      </nav>
      <section className="w-full h-16">
        <div className="flex h-full justify-between items-center bg-blue-500">
          <Link href={'/cart'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <i className="text-white">{IconArrowLeft}</i>
          </Link>
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <span className="text-white">Página inicial</span>
            <i className="text-white">{IconHome}</i>
          </Link>
        </div>
      </section>
      <section className="flex h-full w-full bg-[url('/background.png')] bg-center bg-no-repeat bg-cover">
        <NavMenuMd />
        <div className="flex flex-col h-full border-transparent justify-between w-full md:w-2/3">
          <div className="flex flex-col items-center justify-center w-full h-full px-4">
            <h1 className="font-semibold text-2xl">Opções de usuário</h1>
            <LinkButton color="blue">
              <Link href='/userNegative/createUser'>
                <span className="flex items-center justify-center w-full h-full">Cria conta do Usuário</span>
              </Link>
            </LinkButton>
            <LinkButton color="yellow">
              <Link href='/userNegative'>
                <span className="flex items-center justify-center w-full h-full">Usuário existente</span>
              </Link>
            </LinkButton>
          </div>
        </div>
      </section>
      <nav className="h-20 bg-blue-500 md:hidden">
        <NavMenu />
      </nav>
      <footer className="h-16">
        <Footer />
      </footer>
    </main>
  )
}