import { toastComponent } from "../toasts/Toast";
import { ProductType } from "@/types/productType";
import { dbGetCart } from "../../../backend/db/dbGetCart";
import { dbDeleteCart } from "../../../backend/db/dbDeleteCart";

export async function onLoadingDeleteCartAll(loading: any): Promise<any> {
  let listProducts: {name: string, data: ProductType, uid: string}[] = []
  loading(true)
  await dbDeleteCart()
      .then(() => {
        toastComponent({ type: 'success' }, `Produtos do carrinho retirados com sucesso!`)
      })
  await dbGetCart().then((list) => {
    loading(false)
    listProducts = list
  })
  return listProducts
}