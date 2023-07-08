import { FinalProductType, ProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";
import { UserData, UserNegative } from "@/types/userType";

export function dbCreateUser (data: UserNegative, event?: React.FormEvent<HTMLFormElement>): Promise<void> {
  return new Promise((resolve, reject) => {
    event?.preventDefault()
    const dataNew: UserData = {
      name: data.name.toLocaleLowerCase(),
      data: data
    }
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('NegativeUsers').doc(data.name).collection('UserInformation').add(dataNew).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}