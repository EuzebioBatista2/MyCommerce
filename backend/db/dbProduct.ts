import { ProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

export function submitProduct (event: React.FormEvent<HTMLFormElement>, data: ProductType): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').add(data).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}