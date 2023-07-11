import { formatDate } from "@/functions/verifyFields/verifyDate";
import { authFirebase, dbFirebase } from "../config";

export function dbAddReport(userName: string):Promise<void> {
  let list: any[] = []
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Cart').get().then((products) => {
          products.forEach((product) => {
            list.push({
              name: product.data().data.name,
              amount: product.data().data.amount,
              price: product.data().data.price,
            })
          })
          dbFirebase.doc(user.uid).collection('Report').add({
            user: userName,
            data: list,
            name: userName.toLocaleLowerCase(),
            date: formatDate(new Date())
          })
        })
      }
    })
  })
}