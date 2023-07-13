import { NextRouter } from "next/router";
import { toastComponent } from "../toasts/Toast";
import { dbGetCart } from "../../../backend/db/dbGetCart";
import { authFirebase, dbFirebase } from "../../../backend/config";
import { onLoadingDeleteCartAll } from "./onLoadingDeleteCart";
import { formatDate } from "../verifyFields/verifyDate";

export async function onLoadingAddUserCart(loading: any, router: NextRouter, uid: string): Promise<void> {
  loading(true)
  await dbGetCart().then((list) => {
    authFirebase.onAuthStateChanged((user) => {
      if(user) {
        list.map((product) => {
          dbFirebase.doc(user.uid).collection('ListUsersProducts').doc(uid).collection('Products').add({
            name: product.name,
            data: {
              name: product.data.name, 
              amount: product.data.amount,
              price: product.data.price,
              date: formatDate(new Date())
            }
          })
        })
      }
    })
  })
  await onLoadingDeleteCartAll(loading).then(() => {
    toastComponent({ type: 'success' }, 'Produto inseridos na conta do usuário!')
    router.push('/userNegative')
  })
}