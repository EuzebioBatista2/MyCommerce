import { update } from './../../src/store/reducers/editProductReducers/index';
import { FinalProductType, ProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

export function submitProduct (data: ProductType, event?: React.FormEvent<HTMLFormElement>): Promise<void> {
  return new Promise((resolve, reject) => {
    event?.preventDefault()
    let repeat: boolean = false
    const dataNew: FinalProductType = {
      name: data.name.toLocaleLowerCase(),
      data: data
    }
    authFirebase.onAuthStateChanged((user) => {
      dbFirebase.doc(user?.uid).collection('Products').get().then((values) => {
        values.docs.map((value) => {
          if(value.data().name === data.name.toLocaleLowerCase()) {
            repeat = true
          }
        })
      })
    })

    if(repeat === false) {
      dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').add(dataNew).then(() => {
        resolve()
      })
    }
    else {
      resolve()
    }
  })
}