import { useState } from "react"
import Input from "./Input"
import { useRouter } from "next/router"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import Button from "./Button"
import { onLoadingProduct } from "@/functions/loadingPage/onLoadingProduct"

interface IFormProductProps {
  type: 'product' | 'sell'
}
export default function FormProducts(props: IFormProductProps) {

  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)

  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  const [styleInputName, setStyleInputName] = useState<boolean>(true)
  const [styleInputAmount, setStyleInputAmount] = useState<boolean>(true)
  const [styleInputPrice, setStyleInputPrice] = useState<boolean>(true)

  return (
    props.type === "product" ? (
      <form action="" className="flex flex-col items-center justify-center w-full" 
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          onLoadingProduct(setLoading, event, router, { name, amount, price })
            .then((isValid) => {
              setStyleInputName(!!isValid.isNameValid)
              setStyleInputAmount(!!isValid.isAmountValid)
              setStyleInputPrice(!!isValid.isPriceValid)
            })
        }}
      >
        <Input type="text" text="Name" id="name" inputError={styleInputName} value={name}
        onChange={(event) => {setName(event.target.value), setStyleInputName(true)}} 
        />
        <Input type="number" text="Quantidade" id="amount" inputError={styleInputAmount} value={amount === 0 ? '' : amount}
        onChange={(event) => {setAmount(event.target.value), setStyleInputAmount(true)}} 
        />
        <Input type="number" text="Preço(unidade)" id="price" inputError={styleInputPrice} value={price === 0 ? '' : price}
        onChange={(event) => {setPrice(event.target.value), setStyleInputPrice(true)}} 
        />
        <Button color="blue" text="Cadastrar" submit />
      </form>
    ) : (
      <form action="">
        <Input type="text" text="Name" id="name" inputError={styleInputName} value={name}
        onChange={(event) => {setName(event.target.value), setStyleInputName(true)}} 
        />
        <Input type="number" text="Quantidade" id="amount" inputError={styleInputAmount} value={amount}
        onChange={(event) => {setAmount(event.target.value), setStyleInputAmount(true)}} 
        />
        <Input type="number" text="Preço(unidade)" id="price" inputError={styleInputPrice} value={price}
        onChange={(event) => {setPrice(event.target.value), setStyleInputPrice(true)}} 
        />
        <Button color="blue" text="Cadastrar" submit />
      </form>
    )
  )
}