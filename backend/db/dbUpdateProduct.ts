import { ProductTypeState } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

export function submitUpdate (event: React.FormEvent<HTMLFormElement>, data: ProductTypeState): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    const valueUpdate = data.productFinal
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').doc(data.uid).update(valueUpdate).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}