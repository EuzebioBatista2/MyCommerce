import Head from "next/head";
import NavProfile from "./components/assets/NavProfile";
import { IconAdd, IconHome } from "../../public/icons/icons";
import NavMenu from "./components/assets/NavMenu";
import Footer from "./components/template/Footer";
import Link from "next/link";
import Loading from "./components/assets/Loading";
import DisplayValuesCart from "./components/assets/displayValuesCart";

export default function Cart() {
  
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
          <div className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <i>{IconHome}</i>
            <span className="mt-1">Página Inicial</span>
          </div>
          <Link href={'/product'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <span className="mt-1">Adcionar Produto</span>
            <i>{IconAdd}</i>
          </Link>
        </div>
      </section>
      <section className="flex flex-col w-full h-full bg-purple-300">
        <DisplayValuesCart />
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