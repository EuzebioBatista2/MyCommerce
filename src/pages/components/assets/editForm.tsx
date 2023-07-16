import { useEffect, useState } from "react"
import Input from "./Input"
import { useRouter } from "next/router"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import Button from "./Button"
import { useUpdateProductReducer } from "@/store/reducers/editProductReducers/useUpdateProductReducer"
import { onLoadingEdit } from "@/functions/loadingPage/onLoadingEdit"
import { authFirebase } from "../../../../backend/config"


export default function EditForm() {

  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)

  const { productId } = useUpdateProductReducer()

  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  const [styleInputName, setStyleInputName] = useState<boolean>(true)
  const [styleInputAmount, setStyleInputAmount] = useState<boolean>(true)
  const [styleInputPrice, setStyleInputPrice] = useState<boolean>(true)

  useEffect(() => {
    // Função responsável por pegar os dados selecionado para o cadastro
    authFirebase.onAuthStateChanged(async (user) => {
      if(user) {
        if(productId.productFinal.data.name != '') {
          setName(productId.productFinal.data.name)
          setAmount(+productId.productFinal.data.amount)
          setPrice(+productId.productFinal.data.price)
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
        onLoadingEdit(setLoading, event, router, 
          {productFinal: {
            name: productId.productFinal.name,
            data: {name, amount, price}
          },
          uid: productId.uid
        })
          .then((isValid) => {
            setStyleInputName(!!isValid.isNameValid)
            setStyleInputAmount(!!isValid.isAmountValid)
            setStyleInputPrice(!!isValid.isPriceValid)
          })
      }}
    >
      <Input type="text" text="Name" id="name" inputError={styleInputName} value={name}
        onChange={(event) => { setName(event.target.value), setStyleInputName(true) }}
      />
      <Input type="number" text="Quantidade" id="amount" inputError={styleInputAmount} value={amount === 0 ? '' : amount}
        onChange={(event) => { setAmount(event.target.value), setStyleInputAmount(true) }}
      />
      <Input type="number" text="Preço(unidade)" id="price" inputError={styleInputPrice} value={price === 0 ? '' : price}
        onChange={(event) => { setPrice(event.target.value), setStyleInputPrice(true) }}
      />
      <Button color="blue" text="Atualizar" submit />
    </form>
  )
}