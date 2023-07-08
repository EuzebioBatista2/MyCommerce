import { useState } from "react"
import Input from "./Input"
import { useRouter } from "next/router"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import Button from "./Button"
import { onLoadingCreateUser } from "@/functions/loadingPage/onLoadingCreateUser"


export default function UserForm() {

  const [name, setName] = useState<string>('')
  const [phone, setAmount] = useState<string>('')

  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  const [styleInputName, setStyleInputName] = useState<boolean>(true)
  const [styleInputPhone, setStyleInputPhone] = useState<boolean>(true)

  return (
    <form action="" className="flex flex-col items-center justify-center w-full"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        onLoadingCreateUser(setLoading, event, router, {name, phone})
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
  )
}