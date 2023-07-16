import { IIsValidProductType } from "@/types/isValidType";
import { ProductType } from "@/types/productType";
import { NextRouter } from "next/router";
import { submitProduct } from "../../../backend/db/dbProduct";
import { toastComponent } from "../toasts/Toast";
import { verifyAmount } from "../verifyFields/verifyAmount";
import { verifyPrice } from "../verifyFields/verifyPrice";
import { verifyName } from "../verifyFields/verifyName";

// Função responsável por carregar o loading enquanto o produto é cadastrado(Ou não)
export async function onLoadingProduct(loading: any, event: React.FormEvent<HTMLFormElement>, router: NextRouter, data: ProductType): Promise<IIsValidProductType> {
  event.preventDefault()
  loading(true)
  const isNameValid = verifyName(data.name)
  const isAmountValid = verifyAmount(data.amount)
  const isPriceValid = verifyPrice(data.price)

  if(isNameValid && isAmountValid && isPriceValid) {
    await submitProduct(data, event)
      .then(() => {
        toastComponent({ type: 'success' }, 'Produto cadastrado com sucesso!')
        router.push('/products')
      }).catch(() => {
        toastComponent({ type: 'error' }, 'Produto já existe!')
      })
  }
  loading(false)
  return ({ isNameValid, isAmountValid, isPriceValid })
}