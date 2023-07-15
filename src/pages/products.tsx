import Head from "next/head";
import NavProfile from "./components/assets/NavProfile";
import { IconAdd, IconHome } from "../../public/icons/icons";
import NavMenu from "./components/assets/NavMenu";
import Footer from "./components/template/Footer";
import Link from "next/link";
import Loading from "./components/assets/Loading";
import DisplayValueProducts from "./components/assets/displayValuesProducts";
import NavMenuMd from "./components/assets/NavMenuMd";

export default function Products() {
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
        <div className="flex h-full items-center bg-blue-500">
          <Link href={'/home'} className="flex h-full w-1/2 items-center justify-start cursor-pointer px-2 gap-1">
            <i className="text-white">{IconHome}</i>
            <span className="text-white leading-tight">Página Inicial</span>
          </Link>
          <Link href={'/products/product'} className="flex h-full w-1/2 items-center justify-end cursor-pointer px-2 gap-1">
            <span className="text-white text-right leading-tight">Adcionar Produto</span>
            <i className="text-white">{IconAdd}</i>
          </Link>
        </div>
      </section>
      <section className="flex h-full w-full bg-[url('/cart.jpg')] bg-center bg-no-repeat bg-cover">
        <NavMenuMd />
        <div className="flex flex-col h-full border-transparent justify-between w-full md:w-2/3">
          <DisplayValueProducts />
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