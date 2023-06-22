import Image from "next/image";
import { Component } from "react";
import Form from "../assets/Form";
import Link from "next/link";
import Footer from "./Footer";

export default class ForgotMyPasswordLayout extends Component {

  render() {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className="flex items-center justify-center h-1/5">
          <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={160} height={140} />
        </div>
        <div className="flex flex-col w-full items-center justify-center h-3/5 px-4">
          <h1>Esqueceu sua senha?</h1>
          <h2>Insira seu e-mail abaixo para confirmar seu identidade.</h2>
          <Form type="forgotPassword" />
        </div>
        <div className="flex w-full items-end justify-center h-1/5">
          <Footer />
        </div>
      </div>
    )
  }

}