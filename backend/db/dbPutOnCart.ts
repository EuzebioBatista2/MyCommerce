import { FinalProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

export function dbPutOnCart (event: React.FormEvent<HTMLFormElement>, data: FinalProductType): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Cart').add(data).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}