import { ProductTypeState } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

// Função responsável por atualizar e verificar se já existe um produto
export function dbUpdateProductEdit (data: ProductTypeState, event?: React.FormEvent<HTMLFormElement>): Promise<void> {
  return new Promise((resolve, reject) => {
    let repeat: boolean = false
    event?.preventDefault()
    const valueUpdate = data.productFinal
    // Verifica se já existe um produto e corrige a tabela juntando somando suas quantidades
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').get().then((products) => {
      products.docs.map((product) => {
        if(product.data().data.name.toLocaleLowerCase() === valueUpdate.data.name.toLocaleLowerCase() && product.data().data.price === valueUpdate.data.price) {
          repeat = true
          let newData = {
            data: {
              amount: (+product.data().data.amount) + (+valueUpdate.data.amount),
              name: valueUpdate.data.name,
              price: valueUpdate.data.price 
            },
            name: valueUpdate.data.name.toLocaleLowerCase()
          }
          dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').doc(product.id).update(newData).then(() => {
            dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').doc(data.uid).delete().then(() => {
              resolve()
            })
          })
        }
      })
      // Caso não exista repetição apenas atualiza os dados
      if(repeat === false) {
        let newData = {
          data: {
            amount: valueUpdate.data.amount,
            name: valueUpdate.data.name,
            price: valueUpdate.data.price 
          },
          name: valueUpdate.data.name.toLocaleLowerCase()
        }
        dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').doc(data.uid).update(newData).then(() => {
          resolve()
        })
      }
    }).catch(() => {
      reject()
    })
  })
}