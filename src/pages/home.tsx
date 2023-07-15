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
      <section className="flex flex-col h-full justify-between bg-[url('/cart.jpg')] bg-center bg-no-repeat bg-cover p-2">
        <div className="bg-white bg-opacity-80 rounded-lg h-full">
          <div className="flex w-full items-center justify-center py-10">
            <h1 className="font-semibold text-xl">Dados do comércio</h1>
          </div>
          <div className="flex h-full items-start flex-col text-xl gap-14 px-4">
            <span className="text-center text-sm text-gray-500">*Aqui contém os dados referente a vendas e produtos*</span>
            <DisplayValuesDataHome />
            <LinkButton link="/home/reportSell" color="blue" text="Relátorio de vendas" icon={IconReport} />
          </div>
        </div>
      </section>
      <nav className="h-20 bg-blue-500">
        <NavMenu />
      </nav>
      <footer className="h-16">
        <Footer />
      </footer>
    </main>
  )
}