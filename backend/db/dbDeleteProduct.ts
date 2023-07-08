import { authFirebase, dbFirebase } from "../config";

export function dbDeleteProduct(data: string, collumn: string):Promise<void> {
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection(collumn).doc(data).delete().then(() => {
          resolve()
        })
      }
    })
  })
}