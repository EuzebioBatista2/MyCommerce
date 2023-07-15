import Head from "next/head";
import NavProfile from "../../components/assets/NavProfile";
import { IconArrowLeft, IconHome } from "../../../../public/icons/icons";
import NavMenu from "../../components/assets/NavMenu";
import Footer from "../../components/template/Footer";
import Link from "next/link";
import Loading from "../../components/assets/Loading";
import DisplayValuesInfoReport from "../../components/assets/displayValuesInfoReport";
import NavMenuMd from "@/pages/components/assets/NavMenuMd";

export default function Products() {
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
          <Link href={'/home/reportSell'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <i className="text-white">{IconArrowLeft}</i>
          </Link>
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <span className="text-white">Página inicial</span>
            <i className="text-white">{IconHome}</i>
          </Link>
        </div>
      </section>
      <section className="flex h-full w-full bg-[url('/cart.jpg')] bg-center bg-no-repeat bg-cover">
        <NavMenuMd />
        <div className="flex flex-col h-full border-transparent justify-between w-full md:w-2/3">
          <DisplayValuesInfoReport />
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