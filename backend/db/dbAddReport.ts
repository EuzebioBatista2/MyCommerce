import { formatDate } from "@/functions/verifyFields/verifyDate";
import { authFirebase, dbFirebase } from "../config";

export function dbAddReport():Promise<void> {
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Cart').get().then((products) => {
          products.forEach(async (product) => {
            await dbFirebase.doc(user.uid).collection('Report').add({
              data: {
                name: product.data().data.name,
                amount: product.data().data.amount,
                price: product.data().data.price,
                date: formatDate(new Date())
              },
              name: product.data().name
            })
          })
          resolve()
        })
      }
    })
  })
}