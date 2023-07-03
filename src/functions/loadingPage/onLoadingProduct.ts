import { IIsValidProductType } from "@/types/isValidType";
import { ProductType } from "@/types/productType";
import { NextRouter } from "next/router";
import { submitProduct } from "../../../backend/db/dbProduct";
import { toastComponent } from "../toasts/Toast";

export async function onLoadingProduct(loading: any, event: React.FormEvent<HTMLFormElement>, router: NextRouter, data: ProductType): Promise<IIsValidProductType> {
  event.preventDefault()
  loading(true)
  const isNameValid = typeof(data.name) === "string"
  const isAmountValid = typeof(+data.amount) === "number"
  const isPriceValid = typeof(+data.price) === "number"

  if(isNameValid && isAmountValid && isPriceValid) {
    await submitProduct(event, data)
      .then(() => {
        toastComponent({ type: 'success' }, 'Produto cadastrado com sucesso!')
        router.push('/home')
      })
  }
  loading(false)
  return ({ isNameValid, isAmountValid, isPriceValid })
}