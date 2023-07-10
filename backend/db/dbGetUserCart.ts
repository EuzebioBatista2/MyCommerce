import { UserCart, UserNegative } from '@/types/userType';
import { authFirebase, dbFirebase } from "../config"
import { formatDate } from '@/functions/verifyFields/verifyDate';

export const dbGetUserCart = (uidCart: string): Promise<{ name: string, data: UserCart, uid: string }[]> => {
  return new Promise((resolve, reject) => {
    let list: any[] = []
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('ListUsersProducts').doc(uidCart).collection('Products').get().then((products) => {
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
          console.log(list)
          resolve(list)
        }, (error) => {
          reject(error)
        })
      } else {
        reject(new Error('User not authenticated'))
      }
    })
  })
}