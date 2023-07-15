import Head from "next/head";
import NavProfile from "../components/assets/NavProfile";
import Loading from "../components/assets/Loading";
import Footer from "../components/template/Footer";
import NavMenu from "../components/assets/NavMenu";
import { IconArrowLeft, IconHome } from "../../../public/icons/icons";
import Link from "next/link";
import DisplayValuesReport from "../components/assets/displayValuesReport";

export default function ReportSell() {
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
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <i className="text-white">{IconArrowLeft}</i>
          </Link>
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <span className="text-white">Página inicial</span>
            <i className="text-white">{IconHome}</i>
          </Link>
        </div>
      </section>
      <section className="flex flex-col w-full h-full bg-[url('/cart.jpg')] bg-center bg-no-repeat bg-cover">
        <DisplayValuesReport />
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