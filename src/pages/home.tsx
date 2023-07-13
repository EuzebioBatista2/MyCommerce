import Head from "next/head";
import NavProfile from "./components/assets/NavProfile";
import Loading from "./components/assets/Loading";
import Footer from "./components/template/Footer";
import NavMenu from "./components/assets/NavMenu";
import { IconHome, IconReport } from "../../public/icons/icons";
import Link from "next/link";
import LinkButton from "./components/assets/LinkButton";
import DisplayValuesDataHome from "./components/assets/displayValuesDataHome";

export default function Home() {
  return (
    <main className={`flex flex-col w-screen h-screen bg-gray-100 bg-[url('/background.png')]`}>
      <Loading />
      <Head>
        <title>MyCommerce</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <nav className="w-full h-20 bg-gray-600">
        <NavProfile /> 
      </nav>
      <section  className="w-full h-16 bg-red-500">
        <div className="flex h-full justify-between items-center">
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <i>{IconHome}</i>
            <span className="mt-1">Página Inicial</span>
          </Link>
        </div>
      </section>
      <section className="flex flex-col h-full justify-between bg-purple-300">
        <div className="flex w-full items-center justify-center py-10">
          <h1 className="font-semibold text-2xl">Dados do comércio</h1>
        </div>
        <div className="flex h-full items-start flex-col text-xl gap-14 px-4">
          <DisplayValuesDataHome />
          <LinkButton link="/home/reportSell" color="blue" text="Relátorio de vendas" icon={IconReport} />
        </div>
      </section>
      <nav className="h-20 bg-gray-700">
        <NavMenu />
      </nav>
      <footer className="h-16 bg-green-400">
        <Footer />
      </footer>
    </main>
  )
}