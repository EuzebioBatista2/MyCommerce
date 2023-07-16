import { FinalProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

// Função responsável por inserir os produtros no carrinho
export function dbPutOnCart (event: React.FormEvent<HTMLFormElement>, data: FinalProductType): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    // Verifica se já existe produto no carrinho principal
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').get().then((productsCart) => {
      let repeat: boolean = false
      productsCart.docs.map((productCart) => {
        if (productCart.data().data.name.toLocaleLowerCase() === data.data.name.toLocaleLowerCase() && productCart.data().data.price === data.data.price ) {
          repeat = true
          let newData = {
            data: {
              amount: (+productCart.data().data.amount) + (+data.data.amount),
              name: productCart.data().data.name,
              price: productCart.data().data.price
            },
            name: productCart.data().name
          }
          // Caso exista, mantém o produto e aumenta sua quantidade
          dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').doc(productCart.id).update(newData).then(() => {
            resolve()
          })
        }
      })
      // Caso não exista, insere um novo produto no carrinho principal
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