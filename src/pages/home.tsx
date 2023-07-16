import Head from "next/head";
import NavProfile from "./components/assets/NavProfile";
import Loading from "./components/assets/Loading";
import Footer from "./components/template/Footer";
import NavMenu from "./components/assets/NavMenu";
import { IconHome, IconReport } from "../../public/icons/icons";
import Link from "next/link";
import LinkButton from "./components/assets/LinkButton";
import DisplayValuesDataHome from "./components/assets/displayValuesDataHome";
import NavMenuMd from "./components/assets/NavMenuMd";

export default function Home() {
  return (
    <main className={`flex flex-col w-screen h-screen min-h-[650px] bg-gray-100 bg-[url('/background.png')]`}>
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
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <i className="text-white">{IconHome}</i>
            <span className="text-white">Página Inicial</span>
          </Link>
        </div>
      </section>
      <section className="flex h-full bg-[url('/cart.jpg')] bg-center bg-no-repeat bg-cover">
        <NavMenuMd />
        <div className="flex flex-col h-full border-8 border-transparent justify-between md:w-2/3 w-full">
          <div className="bg-white bg-opacity-80 rounded-lg h-full">
            <div className="flex w-full items-center justify-center py-10">
              <h1 className="font-semibold text-xl md:text-3xl">Dados do comércio</h1>
            </div>
            <div className="flex items-center justify-center flex-col text-xl gap-14 px-4">
              <span className="text-center text-sm md:text-base text-gray-500">*Aqui contém os dados referente a vendas e produtos*</span>
              <DisplayValuesDataHome />
              <LinkButton color="blue">
                <Link href='/home/reportSell'>
                  <i className="flex items-center justify-center absolute h-6 w-6 top-1 left-1">{IconReport}</i>
                  <span className="flex items-center justify-center w-full h-full">Relátorio de vendas</span>
                </Link>
              </LinkButton>
            </div>
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