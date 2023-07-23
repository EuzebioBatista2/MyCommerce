import { toastComponent } from "../toasts/Toast";
import { ProductType } from "@/types/productType";
import { dbGetCartSearch } from "../../../backend/db/dbGetCart";
import { dbDeleteCart } from "../../../backend/db/dbDeleteCart";

// Função responsável por carregar o loading enquanto todos os dados do carrinho são retirados
export async function onLoadingDeleteCartAll(loading: any): Promise<any> {
  let listProducts: {name: string, data: ProductType, uid: string}[] = []
  loading(true)
  console.log("cheguei aqui pra excluir")
  await dbDeleteCart()
      .then(() => {
        toastComponent({ type: 'success' }, `Produtos do carrinho retirados com sucesso!`)
      })
  await dbGetCartSearch('').then((list) => {
    listProducts = list
    loading(false)
  })
  return listProducts
}