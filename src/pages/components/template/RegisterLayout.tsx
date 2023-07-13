import Image from "next/image";
import { Component } from "react";
import Form from "../assets/FormAuth";
import Link from "next/link";
import Footer from "./Footer";
import Loading from "../assets/Loading";

export default class LoginLayout extends Component {
  render() {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full pt-10'>
        <Loading />
        <div className="flex flex-col w-full items-center justify-center h-4/5 px-4 gap-4">
          <h1 className="font-semibold text-2xl">Cadastro de conta</h1>
          <Form type="register" />
          <p className="text-sm mt-4">
            Já possui conta? faça um login clicando <Link href={'/'} className="text-blue-700"><strong>aqui</strong></Link>
          </p>
        </div>
        <div className="flex w-full items-end justify-center h-1/5">
          <Footer />
        </div>
      </div>
    )
  }
}