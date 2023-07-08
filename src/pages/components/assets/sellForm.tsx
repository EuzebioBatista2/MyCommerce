import { useEffect, useState } from "react"
import Input from "./Input"
import { useRouter } from "next/router"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import Button from "./Button"
import { useUpdateProductReducer } from "@/store/reducers/editProductReducers/useUpdateProductReducer"
import { onLoadingEdit } from "@/functions/loadingPage/onLoadingEdit"
import { onLoadingSell } from "@/functions/loadingPage/onLoadingSell"


export default function SellForm() {

  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)

  const { productId } = useUpdateProductReducer()

  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  const [styleInputAmount, setStyleInputAmount] = useState<boolean>(true)

  useEffect(() => {
    if(productId.productFinal.data.name != '') {
      setName(productId.productFinal.data.name)
      setAmount(+productId.productFinal.data.amount)
    } else {
      router.push('/products')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  return (
    <form action="" className="flex flex-col items-center justify-center w-full"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        onLoadingSell(setLoading, event, router, 
          {productFinal: {
            name: productId.productFinal.name,
            data: {name, amount, price: productId.productFinal.data.price}
          },
          uid: productId.uid
        }, productId.productFinal.data.amount)
          .then((isValid) => {
            setStyleInputAmount(!!isValid.isAmountValid)
          })
      }}
    >
      <h2>Nome do produto: <strong>{name}</strong></h2>
      <Input type="number" text="Quantidade" id="amount" inputError={styleInputAmount} value={amount === 0 ? '' : amount}
        onChange={(event) => { setAmount(event.target.value), setStyleInputAmount(true) }}
      />
      <Button color="blue" text="Colocar no carrinho" submit />
    </form>
  )
}