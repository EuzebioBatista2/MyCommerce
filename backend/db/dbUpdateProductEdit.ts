import { ProductTypeState } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

export function dbUpdateProductEdit (data: ProductTypeState, event?: React.FormEvent<HTMLFormElement>): Promise<void> {
  return new Promise((resolve, reject) => {
    let repeat: boolean = false
    event?.preventDefault()
    const valueUpdate = data.productFinal
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').get().then((products) => {
      products.docs.map((product) => {
        console.log("Aqui é os produtos", product.data().data.name)
        console.log("Aqui é o produto a ser modificado", valueUpdate.data.name)
        if(product.data().data.name.toLocaleLowerCase() === valueUpdate.data.name.toLocaleLowerCase() && product.data().data.price === valueUpdate.data.price) {
          repeat = true
          let newData = {
            data: {
              amount: (+product.data().data.amount) + (+valueUpdate.data.amount),
              name: product.data().data.name,
              price: product.data().data.price 
            },
            name: product.data().name
          }
          dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').doc(product.id).update(newData).then(() => {
            dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').doc(data.uid).delete().then(() => {
              resolve()
            })
          })
        }
      })
      if(repeat === false) {
        dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').doc(data.uid).update(valueUpdate).then(() => {
          resolve()
        })
      }
    }).catch(() => {
      reject()
    })
  })
}