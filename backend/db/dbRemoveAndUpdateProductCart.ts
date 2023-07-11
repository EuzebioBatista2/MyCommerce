import { update } from '../../src/store/reducers/editProductReducers/index';
import { FinalProductType, ProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

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
      dbFirebase.doc(user?.uid).collection('Products').get().then((values) => {
        values.docs.map((value) => {
          if(value.data().name === data.name.toLocaleLowerCase()) {
            repeat = true
            repeatData = value.data().data.amount
            uid = value.id
          }
        })

        if(repeat === false) {
          dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').add(dataNew).then(() => {
            resolve()
          })
        }
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
            resolve()
          })
        }

      })
    })
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').doc(uidProduct).delete()

    

    setLoading(false)
  })
}