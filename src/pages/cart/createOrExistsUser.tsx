import Head from "next/head";
import NavProfile from "../components/assets/NavProfile";
import { IconArrowLeft, IconHome, IconSearch } from "../../../public/icons/icons";
import NavMenu from "../components/assets/NavMenu";
import Footer from "../components/template/Footer";
import Input from "../components/assets/Input";
import Link from "next/link";
import { useState } from "react";
import Loading from "../components/assets/Loading";
import Button from "../components/assets/Button";
import { useRouter } from "next/router";
import LinkButton from "../components/assets/LinkButton";

export default function CreateOrExistsUser() {
  const [ search, setSearch ] = useState('')

  const router = useRouter()  
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
          <Link href={'/cart'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <i>{IconArrowLeft}</i>
          </Link>
          <Link href={'/home'} className="flex h-full items-center justify-center cursor-pointer mx-2 gap-1">
            <span className="mt-1">Página inicial</span>
            <i>{IconHome}</i>
          </Link>
        </div>
      </section>
      <section className="flex flex-col w-full h-full bg-purple-300">
        <div className="flex items-center justify-center h-16 bg-gray-700 relative">
        <Input type="text" text="Pesquisar" id="search" value={search}
        onChange={(event) => {setSearch(event.target.value)}} inputError={true}
        />
        <i className="absolute right-2 top-6">{IconSearch}</i>
        </div>
        <div className="p-4">
          {/* <Button color="blue" text="Cria conta do Usuário" onClick={() => router.push('/createUser')} /> */}
          <LinkButton link={'/cart/createOrExistsUser/createUser'} color="blue" text="Cria conta do Usuário"  />
          <LinkButton link={'/userNegative'} color="yellow" text="Usuário existente"  />
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