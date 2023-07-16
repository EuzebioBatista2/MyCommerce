import { useEffect, useState } from "react"
import Input from "./Input"
import { useRouter } from "next/router"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import Button from "./Button"
import { useUpdateProductReducer } from "@/store/reducers/editProductReducers/useUpdateProductReducer"
import { onLoadingSell } from "@/functions/loadingPage/onLoadingSell"
import { authFirebase } from "../../../../backend/config"


export default function SellForm() {

  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)

  const { productId } = useUpdateProductReducer()

  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  const [styleInputAmount, setStyleInputAmount] = useState<boolean>(true)

  useEffect(() => {
    // Função responsável por passar os dados para vender produto no formulário
    authFirebase.onAuthStateChanged(async (user) => {
      if(user) {
        if(productId.productFinal.data.name != '') {
          setName(productId.productFinal.data.name)
          setAmount(+productId.productFinal.data.amount)
        } else {
          router.push('/products')
        }
      } else {
        window.location.href = '/'
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

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