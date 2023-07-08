import { ProductTypeState } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

export function dbOnlyOneProduct(data: string):Promise<ProductTypeState> {
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Products').doc(data).get().then((product) => {
          resolve({
            productFinal: {
              name: product.data()?.name,
              data: product.data()?.data,
            },
            uid: data
          })
        }).catch(() => {
          reject()
        })
      }
    })
  })
  
}