import { FinalProductType, ProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";
import { toastComponent } from '@/functions/toasts/Toast';

// Função responsável por remover o produto do carrinho principal e verificar se ele já existe atualiza-lo
export function dbRemoveAndUpdateProductCart (setLoading: any, data: ProductType, uidProduct: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setLoading(true)
    let repeat: boolean = false
    let repeatData: string = ''
    let uid: string = ''
    const dataNew: FinalProductType = {
      name: data.name.toLocaleLowerCase(),
      data: data
    }
    authFirebase.onAuthStateChanged((user) => {
      // Verifica se já existe um produto com o mesmo nome em produtos
      dbFirebase.doc(user?.uid).collection('Products').get().then((values) => {
        values.docs.map((value) => {
          if(value.data().name === data.name.toLocaleLowerCase() && value.data().data.price === data.price) {
            repeat = true
            repeatData = value.data().data.amount
            uid = value.id
          }
        })

        // Caso não exista, adiciona o produto removido do carrinho e o retira do carrinho principal.
        if(repeat === false) {
          dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').add(dataNew).then(() => {
            dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').doc(uidProduct).delete().then(() => {
              toastComponent({ type: 'success' }, 'Produto retirado do carrinho com sucesso!')
              setLoading(false)
              resolve()
            })
          })
        }
        // Caso exista, atualiza a quantidade do produto existente e o retira do carrinho principal
        else {
          const dataUpdate = {
            name: data.name.toLocaleLowerCase(),
            data: {
              name: data.name,
              amount: (+data.amount) + (+repeatData),
              price: data.price
            }
          }
          dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').doc(uid).update(dataUpdate).then(() => {
            dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').doc(uidProduct).delete().then(() => {
              toastComponent({ type: 'success' }, 'Produto retirado do carrinho com sucesso!')
              setLoading(false)
              resolve()
            })
          })
        }
      })
    })
  })
}