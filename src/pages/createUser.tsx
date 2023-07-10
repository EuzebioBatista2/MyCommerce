import Head from "next/head";
import Loading from "./components/assets/Loading";
import NavProfile from "./components/assets/NavProfile";
import { IconArrowLeft, IconHome } from "../../public/icons/icons";
import Footer from "./components/template/Footer";
import NavMenu from "./components/assets/NavMenu";
import Link from "next/link";
import UserForm from "./components/assets/UserForm";

export default function CreateUser() {
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
      <section className="w-full h-16 bg-red-500">
        <div className="flex h-full justify-between items-center">
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <i>{IconArrowLeft}</i>
          </Link>
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <span className="mt-1">Página inicial</span>
            <i>{IconHome}</i>
          </Link>
        </div>
      </section>
      <section className="h-full w-full  bg-purple-300">
        <div className="flex flex-col items-center justify-center w-full h-full px-4">
          <h1 className="font-semibold text-2xl">Cadastro de Usuários</h1>
          <UserForm />
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