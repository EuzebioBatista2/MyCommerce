import Image from "next/image";
import { Component, ReactNode } from "react";
import Form from "../assets/Form";
import Link from "next/link";

export default class Login extends Component {

  render() {
    return (
      <>
        <div className='flex flex-col items-center justify-center w-full h-full py-4 px-6'>
          <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={200} height={180} />
          <Form />
          <hr className="w-full border-black" />
          <div className="flex w-full items-center justify-center h-16 relative">
            <button className="w-full h-8 bg-blue-500 text-lg font-semibold text-white rounded-sm">
              conta Google
            </button>
          </div>
          <div className="flex flex-col w-full items-start justify-start text-sm text-gray-600">
            <p>Esqueceu sua <Link href={'#'} className="text-blue-700"><strong>senha</strong></Link>?</p>
            <p>Não tem conta? <Link href={'#'} className="text-blue-700"><strong>criar</strong></Link></p>
            <p>Acesse meu PORTFOLIO clicando: <Link href={'#'} className="text-blue-700"><strong>aqui</strong></Link></p>
          </div>
        </div>
      </>
    )
  }

}