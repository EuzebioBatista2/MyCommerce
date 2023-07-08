import { IIsValidProductType } from "@/types/isValidType";
import { ProductTypeState } from "@/types/productType";
import { NextRouter } from "next/router";
import { toastComponent } from "../toasts/Toast";
import { verifyAmount } from "../verifyFields/verifyAmount";
import { verifyPrice } from "../verifyFields/verifyPrice";
import { verifyName } from "../verifyFields/verifyName";
import { submitUpdate } from "../../../backend/db/dbUpdateProduct";
import { verifySellAmount } from "../verifyFields/verifySellAmount";
import { dbPutOnCart } from "../../../backend/db/dbPutOnCart";

export async function onLoadingSell(loading: any, event: React.FormEvent<HTMLFormElement>, router: NextRouter, data: ProductTypeState, amount: number): Promise<IIsValidProductType> {
  event.preventDefault()
  loading(true)
  const isNameValid = verifyName(data.productFinal.data.name)
  const isAmountValid = verifySellAmount(data.productFinal.data.amount, amount)
  const isPriceValid = verifyPrice(data.productFinal.data.price)

  if(isNameValid && isAmountValid && isPriceValid) {
    await dbPutOnCart(event, data.productFinal)
      .then(() => {
        submitUpdate({
          productFinal: {
            name: data.productFinal.name,
            data: {
              name: data.productFinal.data.name,
              amount: amount - data.productFinal.data.amount,
              price: data.productFinal.data.price
            }
          },
          uid: data.uid}, event).then(() => {
            toastComponent({ type: 'success' }, 'Produto cadastrado com sucesso!')
            router.push('/products')
          })
      })
  }
  loading(false)
  return ({ isNameValid, isAmountValid, isPriceValid })
}