import Input from "./Input"
import Button from "./Button"
import { IconBack } from "../../../../public/icons/icons"

interface IFormProps {
  type: 'login' | 'register' | 'forgotPassword'
}
export default function Form(props: IFormProps) {
  return (
    props.type === 'login' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full">
          <Input type="email" text="Email" id="email" />
          <Input type="password" text="Senha" id="password" />
          <Button text="Login" />
        </form>
      </div>
    ) : ( props.type === 'register' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full">
          <Input type="text" text="Nome" id="name" />
          <Input type="text" text="Sobrenome" id="lastName" />
          <Input type="email" text="Email" id="email" />
          <Input type="password" text="Senha" id="password" />
          <Input type="password" text="Confirma Senha" id="confirmPassword" />
          <Button text="Registrar" />
        </form>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full">
          <Input type="email" text="Email" id="email" />
          <Button text="Enviar" />
          <Button text="Retornar" icon={IconBack}/>
        </form>
      </div>
    )
    )
  )
}