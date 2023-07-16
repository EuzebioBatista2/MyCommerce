import { UserCart } from '@/types/userType';
import { authFirebase, dbFirebase } from "../config"

// Realiza consulta na tabela de um usuário especifico com a lista dos produtos cadastrado em seu carrinho unico
export const dbGetUserCart = (uidCart: string, value: string): Promise<{ name: string, data: UserCart, uid: string }[]> => {
  return new Promise((resolve, reject) => {
    let list: any[] = []
    let valueLower = value.toLocaleLowerCase()
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('ListUsersProducts').doc(uidCart).collection('Products')
        .orderBy('name')
        .startAt(valueLower).endAt(valueLower + '\uf8ff')
        .get()
        .then((products) => {
          list = products.docs.map((product) => ({
            name: product.data().name,
            data: {
              name: product.data().data.name,
              amount: product.data().data.amount,
              price: product.data().data.price,
              date: product.data().data.date
            },
            uid: product.id
          }))
          resolve(list)
        }, (error) => {
          reject(error)
        })
      } else {
        window.location.href = '/'
      }
    })
  })
}