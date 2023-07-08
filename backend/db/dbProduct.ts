import { FinalProductType, ProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

export function submitProduct (data: ProductType, event?: React.FormEvent<HTMLFormElement>): Promise<void> {
  return new Promise((resolve, reject) => {
    event?.preventDefault()
    const dataNew: FinalProductType = {
      name: data.name.toLocaleLowerCase(),
      data: data
    }
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').add(dataNew).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}