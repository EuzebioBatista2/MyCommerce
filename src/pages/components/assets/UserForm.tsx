import { useEffect, useState } from "react"
import Input from "./Input"
import { useRouter } from "next/router"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import Button from "./Button"
import { onLoadingCreateUser } from "@/functions/loadingPage/onLoadingCreateUser"
import { onLoadingAddReport } from "@/functions/loadingPage/onLoadingAddReport"
import { verifyName } from "@/functions/verifyFields/verifyName"
import { authFirebase } from "../../../../backend/config"

interface IUserForm {
  mode: 'User' | 'Identify'
}

export default function UserForm(props: IUserForm) {

  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  useEffect(() => {
    authFirebase.onAuthStateChanged(async (user) => {
      if(user) {
        setLoading(false)
      } else {
        window.location.href = '/'
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Verifica se o checkbox de manter conectado foi marcado quando a tela for fechada
    const remember = localStorage.getItem('rememberMyAccontMyCommerce')
    if ( remember === "false" ) {
      const handleBeforeUnload = () => {
        authFirebase.signOut();
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  const [name, setName] = useState<string>('')
  const [phone, setAmount] = useState<string>('')

  

  const [styleInputName, setStyleInputName] = useState<boolean>(true)
  const [styleInputPhone, setStyleInputPhone] = useState<boolean>(true)

  return (
    props.mode === 'User' ? (
      <form action="" className="flex flex-col items-center justify-center w-full"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          onLoadingCreateUser(setLoading, event, router, { name, phone })
            .then((isValid) => {
              setStyleInputName(!!isValid.isNameValid)
              setStyleInputPhone(!!isValid.isPhoneValid)
            })
        }}
      >
        <Input type="text" text="Name" id="name" inputError={styleInputName} value={name}
          onChange={(event) => { setName(event.target.value), setStyleInputName(true) }}
        />
        <Input type="text" text="Telefone" id="phone" inputError={styleInputPhone} value={phone}
          onChange={(event) => { setAmount(event.target.value), setStyleInputPhone(true) }}
        />
        <Button color="blue" text="Cadastrar usuário" submit />
      </form>
    ) : (
      <form action="" className="flex flex-col items-center justify-center w-full"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          let value = verifyName(name)
          if(value) {
            onLoadingAddReport(setLoading, name)
            router.push('/cart')
          } else {
            setStyleInputName(false)
          }
        }}
      >
        <Input type="text" text="Name" id="name" inputError={styleInputName} value={name}
          onChange={(event) => { setName(event.target.value), setStyleInputName(true) }}
        />
        <Button color="yellow" text="Finalizar pagamento" submit />
      </form>
    )
  )
}