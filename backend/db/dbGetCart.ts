import { ProductType } from './../../src/types/productType';
import { authFirebase, dbFirebase } from "../config"

// Função responsável por pegar todos os produtos da lista do carrinho principal
export const dbGetCart = (): Promise<{name: string, data: ProductType, uid: string}[]> => {
  return new Promise<{name: string, data: ProductType, uid: string}[]>((resolve, reject) => {
    let list: any[] = []
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Cart').get().then((products) => {
          list = products.docs.map((product) => ({ 
            name: product.data().name,
            data: product.data().data,
            uid: product.id
          }))
          resolve(list)
        }, (error) => {
          reject(error)
        })
      } else {
        window.location.href = '/'
      }
    })
  })
}

// Função para realizar a consulta, trazendo apenas os dados filtrados a partir do valor obtido em "value"
export const dbGetCartSearch = (value: string): Promise<{name: string, data: ProductType, uid: string}[]> => {
  return new Promise<{name: string, data: ProductType, uid: string}[]>((resolve, reject) => {
    let list: any[] = []
    let valueLower = value.toLocaleLowerCase()
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Cart')
        .orderBy('name')
        .startAt(valueLower).endAt(valueLower + '\uf8ff')
        .get()
        .then((products) => {
          list = products.docs.map((product) => ({ 
            name: product.data().name,
            data: product.data().data,
            uid: product.id
          }))
          resolve(list)
        }, (error) => {
          reject(error)
        })
      } else {
        window.location.href = '/'
      }
    })
  })
}