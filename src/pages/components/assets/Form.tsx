import Input from "./Input"
import Button from "./Button"
import { IconBack } from "../../../../public/icons/icons"
import Link from "next/link"
import { RegisterType } from "@/types/registerType"
import { toast } from "react-toastify"

interface IFormProps {
  type: 'login' | 'register' | 'forgotPassword'
}
export default function Form(props: IFormProps) {

  function submitRegister(event: React.FormEvent<HTMLFormElement> | Event) {
    event.preventDefault()
    const name = document.querySelector<HTMLInputElement>('#name')
    const email = document.querySelector<HTMLInputElement>('#email')
    const password = document.querySelector<HTMLInputElement>('#password')
    const confirmPassword = document.querySelector<HTMLInputElement>('#confirmPassword')
    const image = document.querySelector<HTMLInputElement>('#file')

    const user: RegisterType = {
      name,
      email,
      password,
      confirmPassword,
      image
    }
    verifyRegister(user)
  }

  function verifyRegister(user: RegisterType) {
    if ( user.name && (user.name.value.length >= 4 && user.name.value.length < 70 )) {
      user.name.className = `${user.name.className.replace('text-red-500 border-red-500', '')}`
    } else if(user.name) {
      user.name.className += " text-red-500 border-red-500"
      toast.error('Erro no campo nome!', {
        position: toast.POSITION.TOP_CENTER,
        className: 'w-4/5'
      })
    }
    
    if ( user.email && user.email.value.match(/[\w\.\+]+@[\w]+\.[\w]+(\.[\w]+)?/g)) {
      user.email.className = `${user.email.className.replace('text-red-500 border-red-500', '')}`
    } else if(user.email) {
      user.email.className += " text-red-500 border-red-500"
      toast.error('Erro no campo email!', {
        position: toast.POSITION.TOP_CENTER,
        className: 'w-4/5'
      })
    }
  }

  
  return (
    props.type === 'login' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full">
          <Input type="email" text="Email" id="email" />
          <Input type="password" text="Senha" id="password" />
          <Button color="blue" text="Login" submit />
        </form>
      </div>
    ) : ( props.type === 'register' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full" onSubmit={(event) => submitRegister(event)}>
          <Input type="text" text="Nome" id="name" />
          <Input type="text" text="Email" id="email" />
          <Input type="password" text="Senha" id="password" />
          <Input type="password" text="Confirma Senha" id="confirmPassword" />
          <div className="flex h-14 relative px-1 py-3.5 text-sm">
            <label htmlFor="file" className="w-1/2 text-base">Imagem de perfil:</label>
            <input type="file" name="file" id="file" accept="image/*" />
          </div>
          <Button color="blue" text="Registrar" submit />
        </form>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full">
          <Input type="email" text="Email" id="email" />
          <Button color="blue" text="Enviar" submit />
          <Link href={'/'}>
            <Button color="yellow" text="Retornar" icon={IconBack}/>
          </Link>
        </form>
      </div>
    )
    )
  )
}