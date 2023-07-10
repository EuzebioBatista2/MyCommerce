import { ProductType } from './../../src/types/productType';
import { authFirebase, dbFirebase } from "../config"

export const dbGetCart = (value?: string): Promise<{name: string, data: ProductType, uid: string}[]> => {
  return new Promise<{name: string, data: ProductType, uid: string}[]>((resolve, reject) => {
    let list: any[] = []
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Cart').onSnapshot((products) => {
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
        reject(new Error('User not authenticated'))
      }
    })
  })
}

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
        reject(new Error('User not authenticated'))
      }
    })
  })
}