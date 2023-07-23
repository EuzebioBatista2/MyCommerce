import { formatDate } from "@/functions/verifyFields/verifyDate";
import { authFirebase, dbFirebase } from "../config";

// Função responsável por inserir as informações do clientes que compraram os produtos a lista de relátorio
export function dbAddReport(userName: string):Promise<void> {
  let list: any[] = []
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      console.log("chegeui aqui no report")
      if (user) {
        // Pegando a lista de produtos do carrinho
        dbFirebase.doc(user.uid).collection('Cart').get().then((products) => {
          products.forEach((product) => {
            list.push({
              name: product.data().data.name,
              amount: product.data().data.amount,
              price: product.data().data.price,
            })
          })
          // inserindo as informações obtidas na coluna de relátorio
          dbFirebase.doc(user.uid).collection('Report').add({
            user: userName,
            data: list,
            name: userName.toLocaleLowerCase(),
            date: formatDate(new Date())
          })
        })
        resolve()
      }
    })
  })
}