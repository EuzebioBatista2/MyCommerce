import { authFirebase, dbFirebase } from "../config";

export function dbDeleteCart():Promise<void> {
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Cart').get().then((products) => {
          products.forEach(async (product) => {
            await dbFirebase.doc(user.uid).collection('Cart').doc(product.id).delete()
          })
          resolve()
        })
      }
    })
  })
}