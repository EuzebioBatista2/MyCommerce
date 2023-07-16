import Input from "./Input"
import Button from "./Button"
import { IconBack } from "../../../../public/icons/icons"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { onLoadingRegister } from "@/functions/loadingPage/onLoadingRegister"
import { onLoadingLogin } from "@/functions/loadingPage/onLoadingLogin"
import Image from "next/image"
import { onLoadingResetPassword } from "@/functions/loadingPage/onLoadingResetPassword"
import { verifyImage } from "@/functions/verifyFields/verifyImage"
import { verifyCheckBox } from "@/functions/verifyFields/verifyCheckbox"
import LinkButton from "./LinkButton"

interface IFormProps {
  type: 'login' | 'register' | 'forgotPassword'
}


export default function FormAuth(props: IFormProps) {

  // Controlando o estados dos inputs
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [image, setImage] = useState<any>('')
  const [checkbox, setCheckbox] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<any>('');

  // Variável para regular o loading e o router para mudança de página
  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  // Alterando o style dos inputs em caso de erro
  const [styleInputName, setStyleInputName] = useState<boolean>(true)
  const [styleInputEmail, setStyleInputEmail] = useState<boolean>(true)
  const [styleInputPassword, setStyleInputPassword] = useState<boolean>(true)

  useEffect(() => {
    // Função responsável por carregar a imagem durante o cadastro
    if (image && image[0]) {
      const reader = new FileReader();
      let IsValid: boolean = verifyImage(image[0])
      if (IsValid) {
        reader.readAsDataURL(image[0]);
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
      } else {
        setPreviewImage('/userUnknown.jpg')
        setImage('')
      }
    }
  }, [image])

  useEffect(() => {
    // Verifica se o checkbox de manter conectado foi marcado quando a tela for fechada
    const remember = localStorage.getItem('rememberMyAccontMyCommerce')
    if (remember === "true") {
      setCheckbox(true)
    } else {
      setCheckbox(false)
    }
  }, [])

  return (
    props.type === 'login' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full items-center justify-center"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            onLoadingLogin(setLoading, event, router, { email, password })
              .then((isValid) => {
                setStyleInputEmail(!!isValid.isEmailValid)
                setStyleInputPassword(!!isValid.isPasswordValid)
              })
          }}
        >
          <Input type="text" text="Email" id="email" inputError={styleInputEmail}
            onChange={(event) => { setEmail(event.target.value), setStyleInputEmail(true) }} value={email} />
          <Input type="password" text="Senha" id="password" inputError={styleInputPassword}
            onChange={(event) => { setPassword(event.target.value), setStyleInputPassword(true) }} value={password} />
          <Input type="checkbox" text="Mantenha-me conectado" id="verify" checked={checkbox}
            onChange={(event) => { 
              setCheckbox(event.target.checked) 
              verifyCheckBox(event.target.checked)
            }} />
          <Button color="blue" text="Login" submit />
        </form>
      </div>
    ) : (props.type === 'register' ? (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-center h-32 w-32 rounded-full overflow-hidden border border-gray-200 bg-white">
          <Image src={previewImage ? previewImage : '/userUnknown.jpg'} alt="FotoDePerfil" width={160} height={140} priority={true} className="h-auto w-auto" />
        </div>
        <form action="" className="flex flex-col w-full items-center justify-center"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            onLoadingRegister(setLoading, event, router, { name, email, password, confirmPassword, image })
              .then((isValid) => {
                setStyleInputName(!!isValid.isNameValid)
                setStyleInputEmail(!!isValid.isEmailValid)
                setStyleInputPassword(!!isValid.isPasswordValid)
              })
          }} >
          <Input type="text" text="Nome" id="name" inputError={styleInputName}
            onChange={(event) => { setName(event.target.value), setStyleInputName(true) }} value={name} />
          <Input type="text" text="Email" id="email" inputError={styleInputEmail}
            onChange={(event) => { setEmail(event.target.value), setStyleInputEmail(true) }} value={email} />
          <Input type="password" text="Senha" id="password" inputError={styleInputPassword}
            onChange={(event) => { setPassword(event.target.value), setStyleInputPassword(true) }} value={password} />
          <Input type="password" text="Confirma Senha" id="confirmPassword" inputError={styleInputPassword}
            onChange={(event) => { setConfirmPassword(event.target.value), setStyleInputPassword(true) }} value={confirmPassword} />
          <Input type="file" text="Imagem de perfil" id="imagemProfile"
            onChange={(event) => { setImage(event.target.files) }} />
          <Button color="blue" text="Registrar" submit />
        </form>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center w-full">
        <form action="" method="post" className="flex flex-col w-full items-center justify-center"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            onLoadingResetPassword(setLoading, event, email)
            .then((isValid) => {
              setEmail('')
              setStyleInputEmail(!!isValid.isEmailValid)
            })
          }}>
          <Input type="text" text="Email" id="email" inputError={styleInputEmail}
            onChange={(event) => { setEmail(event.target.value), setStyleInputEmail(true) }} value={email} />
          <Button color="blue" text="Enviar" submit />
          <LinkButton link="/" color="yellow" text="Retornar" icon={IconBack} />
        </form>
      </div>
    ))
  )
}