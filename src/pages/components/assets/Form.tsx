import Input from "./Input"
import Button from "./Button"
import { IconBack } from "../../../../public/icons/icons"
import Link from "next/link"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import { useRouter } from "next/router"
import { useState } from "react"
import { onLoadingRegister } from "@/functions/loadingPage/onLoadingRegister"
import { onLoadingLogin } from "@/functions/loadingPage/onLoadingLogin"
import { useUserReducer } from "@/store/reducers/loginReducers/useLoginReducer"
interface IFormProps {
  type: 'login' | 'register' | 'forgotPassword'
}


export default function Form(props: IFormProps) {

  // Controlando o estados dos inputs
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [image, setImage] = useState<any>(null)

  // Variável para regular o loading e o router para mudança de página
  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  // Alterando o style dos inputs em caso de erro
  const [styleInputName, setStyleInputName] = useState<boolean>(true)
  const [styleInputEmail, setStyleInputEmail] = useState<boolean>(true)
  const [styleInputPassword, setStyleInputPassword] = useState<boolean>(true)
  const [styleInputImage, setStyleInputImage] = useState<boolean>(true)

  return (
    props.type === 'login' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full" 
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          onLoadingLogin(setLoading, event, router, {email, password})
          .then((isValid) => {
            setStyleInputEmail(!!isValid.isEmailValid)
            setStyleInputPassword(!!isValid.isPasswordValid)
          })
        }}
        >
          <Input type="email" text="Email" id="email" className={styleInputEmail ? '' : 'text-red-500 border-red-500'}
            onChange={(event) => { setEmail(event.target.value), setStyleInputEmail(true) }} value={email} />
          <Input type="password" text="Senha" id="password" className={styleInputPassword ? '' : 'text-red-500 border-red-500'}
            onChange={(event) => { setPassword(event.target.value), setStyleInputPassword(true) }} value={password} />
          <Button color="blue" text="Login" submit />
        </form>
      </div>
    ) : (props.type === 'register' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <form action=""  className="flex flex-col w-full"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            onLoadingRegister(setLoading, event, router, {name, email, password, confirmPassword, image})
            .then((isValid) => {
              setStyleInputName(!!isValid.isNameValid)
              setStyleInputEmail(!!isValid.isEmailValid)
              setStyleInputPassword(!!isValid.isPasswordValid)
              setStyleInputImage(!!isValid.isImageValid)
            })
          }} >
          <Input type="text" text="Nome" id="name" className={styleInputName ? '' : 'text-red-500 border-red-500'}
            onChange={(event) => { setName(event.target.value), setStyleInputName(true) }} value={name} />
          <Input type="text" text="Email" id="email" className={styleInputEmail ? '' : 'text-red-500 border-red-500'}
            onChange={(event) => { setEmail(event.target.value), setStyleInputEmail(true) }} value={email} />
          <Input type="password" text="Senha" id="password" className={styleInputPassword ? '' : 'text-red-500 border-red-500'}
            onChange={(event) => { setPassword(event.target.value), setStyleInputPassword(true) }} value={password} />
          <Input type="password" text="Confirma Senha" id="confirmPassword" className={styleInputPassword ? '' : 'text-red-500 border-red-500'}
            onChange={(event) => { setConfirmPassword(event.target.value), setStyleInputPassword(true) }} value={confirmPassword} />
          <div className="flex items-center h-14 relative px-1 py-3.5 text-sm">
            <label htmlFor="file" className="w-1/2 text-base">Foto de perfil:</label>
            <input type="file" name="file" id="file" accept="image/*" className={styleInputImage ? '' : 'text-red-500 border-red-500'}
              onChange={(event) => { setImage(event.target.files), setStyleInputImage(true) }} />
          </div>
          <Button color="blue" text="Registrar" submit />
        </form>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full">
          <Input type="email" text="Email" id="email" className={styleInputEmail ? '' : 'text-red-500 border-red-500'}
            onChange={(event) => { setEmail(event.target.value), setStyleInputEmail(true) }} value={email} />
          <Button color="blue" text="Enviar" submit />
          <Link href={'/'}>
            <Button color="yellow" text="Retornar" icon={IconBack} />
          </Link>
        </form>
      </div>
    ))
  )
}