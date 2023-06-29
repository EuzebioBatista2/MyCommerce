import Image from "next/image";
import { Component } from "react";
import Form from "../assets/Form";
import Link from "next/link";
import Footer from "./Footer";
import Button from "../assets/Button";
import { IconGoogle } from "../../../../public/icons/icons";
import Loading from "../assets/Loading";

export default class LoginLayout extends Component {

  render() {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <Loading />
        <div className="flex items-center justify-center h-1/5">
          <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={160} height={140} priority={true} style={{ height: "auto", width: "auto" }} />
        </div>
        <div className="flex flex-col w-full items-center justify-center h-2/5 px-4">
          <Form type="login" />
          <Button color="blue" text="conta Google" icon={IconGoogle} />
        </div>
        <div className="flex flex-col w-full relative my-3 h-1/5 gap-2 px-4">
          <ul className="flex flex-col items-start justify-start text-sm text-gray-600 gap-2">
            <li>Esqueceu sua <Link href={'/forgotPassword'} className="text-blue-700"><strong>senha</strong></Link>?</li>
            <li>Não tem conta? <Link href={'/register'} className="text-blue-700"><strong>criar</strong></Link></li>
            <li>Acesse meu PORTFOLIO clicando: <Link href={'#'} className="text-blue-700"><strong>aqui</strong></Link></li>
          </ul>
        </div>
        <div className="flex w-full items-end justify-center h-1/5">
          <Footer />
        </div>
      </div>
    )
  }

}