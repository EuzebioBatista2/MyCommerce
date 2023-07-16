import { IIsValidProductType } from "@/types/isValidType";
import { ProductTypeState } from "@/types/productType";
import { NextRouter } from "next/router";
import { toastComponent } from "../toasts/Toast";
import { verifyAmount } from "../verifyFields/verifyAmount";
import { verifyPrice } from "../verifyFields/verifyPrice";
import { verifyName } from "../verifyFields/verifyName";
import { dbUpdateProductEdit } from "../../../backend/db/dbUpdateProductEdit";

// Função responsável por carregar o loading enquanto os dados do produto editado são atulizados
export async function onLoadingEdit(loading: any, event: React.FormEvent<HTMLFormElement>, router: NextRouter, data: ProductTypeState): Promise<IIsValidProductType> {
  event.preventDefault()
  loading(true)
  const isNameValid = verifyName(data.productFinal.data.name)
  const isAmountValid = verifyAmount(data.productFinal.data.amount)
  const isPriceValid = verifyPrice(data.productFinal.data.price)

  if(isNameValid && isAmountValid && isPriceValid) {
    await dbUpdateProductEdit(data, event)
      .then(() => {
        toastComponent({ type: 'success' }, 'Produto cadastrado com sucesso!')
        router.push('/products')
      })
  }
  loading(false)
  return ({ isNameValid, isAmountValid, isPriceValid })
}