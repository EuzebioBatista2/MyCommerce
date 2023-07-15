import { update } from './../../src/store/reducers/editProductReducers/index';
import { FinalProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

export function dbPutOnCart (event: React.FormEvent<HTMLFormElement>, data: FinalProductType): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').get().then((productsCart) => {
      let repeat: boolean = false
      productsCart.docs.map((productCart) => {
        console.log("Aqui é do carrinho", productCart.data().data.name)
        console.log("Aqui é o produto a ser verificado", data.data.name)
        if (productCart.data().data.name.toLocaleLowerCase() === data.data.name.toLocaleLowerCase() && productCart.data().data.price === data.data.price ) {
          console.log("entrei aqui")
          repeat = true
          let newData = {
            data: {
              amount: (+productCart.data().data.amount) + (+data.data.amount),
              name: productCart.data().data.name,
              price: productCart.data().data.price
            },
            name: productCart.data().name
          }
          dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').doc(productCart.id).update(newData).then(() => {
            resolve()
          })
        }
      })
      if(repeat === false) {
        dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').add(data).then(() => {
          resolve()
        })
      }
    }).catch(() => {
      reject()
    })
  })
}