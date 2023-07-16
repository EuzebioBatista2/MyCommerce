import { NextRouter } from "next/router";
import { toastComponent } from "../toasts/Toast";
import { dbGetCart } from "../../../backend/db/dbGetCart";
import { authFirebase, dbFirebase } from "../../../backend/config";
import { onLoadingDeleteCartAll } from "./onLoadingDeleteCart";
import { formatDate } from "../verifyFields/verifyDate";

// Função responsável por carregar o loading enquanto os dados do carrinho principal são inseridos nos usuários em dívida(Ou não)
export async function onLoadingAddUserCart(loading: any, router: NextRouter, uid: string): Promise<void> {
  loading(true)
  await dbGetCart().then((list) => {
    authFirebase.onAuthStateChanged((user) => {
      if (list.length > 0) {
        if(user) {
          list.map((product) => {
            // Realiza a transferencia da lista de produtos do carrinho principal para o carrinho do usuário em dívida
            dbFirebase.doc(user.uid).collection('ListUsersProducts').doc(uid).collection('Products').add({
              name: product.name,
              data: {
                name: product.data.name, 
                amount: product.data.amount,
                price: product.data.price,
                date: formatDate(new Date())
              }
            }).then(() => {
              onLoadingDeleteCartAll(loading).then(() => {
                toastComponent({ type: 'success' }, 'Produto inseridos na conta do usuário!')
                router.push('/userNegative')
              })
            })
          })
        }
      } else {
        toastComponent({ type: 'error' }, 'Não há produtos no carrinho!')
        loading(false)
        router.push('/userNegative')
      }
    })
  })
}