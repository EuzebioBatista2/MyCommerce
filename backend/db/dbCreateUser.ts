import { UserNegative } from './../../src/types/userType';
import { authFirebase, dbFirebase } from "../config";

export function dbCreateUser (data: UserNegative, event?: React.FormEvent<HTMLFormElement>): Promise<void> {
  return new Promise((resolve, reject) => {
    event?.preventDefault()
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('ListUsersProducts').add({}).then((user) => {
      dbFirebase.doc(authFirebase.currentUser?.uid).collection('ListUsers').add({
        name: data.name.toLocaleLowerCase(), 
        data: {name: data.name, phone: data.phone}, 
        uid: user.id})
      resolve()
    }).catch(() => {
      reject()
    })
  })
}