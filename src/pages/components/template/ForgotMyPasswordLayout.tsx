import Image from "next/image";
import { Component } from "react";
import Form from "../assets/FormAuth";
import Footer from "./Footer";

export default class ForgotMyPasswordLayout extends Component {

  render() {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className="flex items-center justify-center h-1/5">
          <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={160} height={140} priority={true} style={{ height: "auto", width: "auto" }} />
        </div>
        <div className="flex flex-col w-full items-center justify-center  h-3/5 px-4">
          <div className="flex flex-col text-center gap-3">
            <h1 className="font-semibold text-2xl">Esqueceu sua senha?</h1>
            <h2 className="font-semibol text-base text-gray-800">Insira seu e-mail abaixo.</h2>
            <h3 className="text-sm text-gray-600">*Será enviado um e-mail para confirmar sua autenticação*</h3>
            <h3 className="text-sm text-gray-600">*<strong>OBS</strong>: Só funciona para e-mails existentes*</h3>
          </div>
          <Form type="forgotPassword" />
        </div>
        <div className="flex w-full items-end justify-center h-1/5">
          <Footer />
        </div>
      </div>
    )
  }

}