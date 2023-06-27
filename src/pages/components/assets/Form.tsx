import Input from "./Input"
import Button from "./Button"
import { IconBack } from "../../../../public/icons/icons"
import Link from "next/link"
import { submitRegister } from "@/functions/submitRegister"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
interface IFormProps {
  type: 'login' | 'register' | 'forgotPassword'
}


export default function Form(props: IFormProps) {
  const {setLoading} = useLoadingReducer()

  const onLoading = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    await submitRegister(event)
    setLoading(false)
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
    ) : (props.type === 'register' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full" onSubmit={onLoading} >
          <Input type="text" text="Nome" id="name" />
          <Input type="text" text="Email" id="email" />
          <Input type="password" text="Senha" id="password" />
          <Input type="password" text="Confirma Senha" id="confirmPassword" />
          <div className="flex items-center h-14 relative px-1 py-3.5 text-sm">
            <label htmlFor="file" className="w-1/2 text-base">Foto de perfil:</label>
            <input type="file" name="file" id="file" accept="image/*" />
          </div>
          <Button color="blue" text="Registrar" submit/>
        </form>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full">
          <Input type="email" text="Email" id="email" />
          <Button color="blue" text="Enviar" submit />
          <Link href={'/'}>
            <Button color="yellow" text="Retornar" icon={IconBack} />
          </Link>
        </form>
      </div>
    )
    )
  )
}