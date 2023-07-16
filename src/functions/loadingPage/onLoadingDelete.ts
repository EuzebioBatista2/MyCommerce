import { toastComponent } from "../toasts/Toast";
import { dbDeleteProduct } from "../../../backend/db/dbDeleteProduct";
import { getDataSearchValue } from "../../../backend/db/dbSearch";
import { ProductType } from "@/types/productType";
import { NextRouter } from "next/router";

// Função responsável por carregar o loading enquanto um produto é excluído
export async function onLoadingDeleteProduct(loading: any, data: string, name: string, router: NextRouter): Promise<any> {
  let listProducts: {name: string, data: ProductType, uid: string}[] = []
  loading(true)
  await dbDeleteProduct(data, 'Products')
      .then(() => {
        toastComponent({ type: 'success' }, `Produto: ${name} excluído com sucesso!`)
      })
  await getDataSearchValue('').then((list) => {
    router.push('/products')
    loading(false)
    listProducts = list
  })
  return listProducts
}

