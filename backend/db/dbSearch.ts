import { ProductType } from './../../src/types/productType';
import { authFirebase, dbFirebase } from "../config"

export const getDataSearchValue = (value: string): Promise<{name: string, data: ProductType, uid: string}[]> => {
  return new Promise<{name: string, data: ProductType, uid: string}[]>((resolve, reject) => {
    let list: any[] = []
    let valueLower = value.toLocaleLowerCase()
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Products')
        .orderBy('name')
        .startAt(valueLower).endAt(valueLower + '\uf8ff')
        .get()
        .then((products) => {
          products.docs.map((product) => {
            if(product.data().data.amount > 0) {
              list.push({ 
                name: product.data().name,
                data: product.data().data,
                uid: product.id
              })
            } else {

            }
          })
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