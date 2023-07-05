import { ProductType } from './../../src/types/productType';
import { authFirebase, dbFirebase } from "../config"

export const getDataSearch = (value?: string): Promise<{name: string, data: ProductType}[]> => {
  return new Promise<{name: string, data: ProductType}[]>((resolve, reject) => {
    let list: any[] = []
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Products').onSnapshot((products) => {
          list = products.docs.map((product) => product.data())
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