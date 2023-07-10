import { toastComponent } from "../toasts/Toast";
import { dbDeleteProduct } from "../../../backend/db/dbDeleteProduct";
import { getDataSearchValue } from "../../../backend/db/dbSearch";
import { ProductType, ProductTypeState } from "@/types/productType";
import { dbGetCart } from "../../../backend/db/dbGetCart";
import { dbOnlyOneProduct } from "../../../backend/db/dbOnlyOneProduct";
import { submitUpdate } from "../../../backend/db/dbUpdateProduct";
import { submitProduct } from "../../../backend/db/dbProduct";

export async function onLoadingDeleteProduct(loading: any, data: string, name: string): Promise<any> {
  let listProducts: {name: string, data: ProductType, uid: string}[] = []
  loading(true)
  await dbDeleteProduct(data, 'Products')
      .then(() => {
        toastComponent({ type: 'success' }, `Produto: ${name} excluído com sucesso!`)
      })
  await getDataSearchValue('').then((list) => {
    loading(false)
    listProducts = list
  })
  return listProducts
}

export async function onLoadingDeleteCart(loading: any, data: string, name: string, product: { name: string, data: ProductType, uid: string }): Promise<any> {
  let listProducts: {name: string, data: ProductType, uid: string}[] = []
  loading(true)
  await dbOnlyOneProduct(data).then((dataProduct) => {
    const addProduct: ProductTypeState = {
      productFinal: {
        name: dataProduct.productFinal.name,
        data: {
          amount: dataProduct.productFinal.data.amount + product.data.amount,
          name: dataProduct.productFinal.data.name,
          price: dataProduct.productFinal.data.price
        }
      },
      uid: data 
    }
    submitUpdate(addProduct)
  }).catch(() => {
    const newProduct: ProductType = {
      name: product.data.name,
      amount: product.data.amount,
      price: product.data.price
    }
    submitProduct(newProduct)
  })
  await dbDeleteProduct(data, 'Cart')
      .then(() => {
        toastComponent({ type: 'success' }, `Produto: ${name} excluído com sucesso!`)
      })
  await dbGetCart().then((list) => {
    loading(false)
    listProducts = list
  })
  return listProducts
}