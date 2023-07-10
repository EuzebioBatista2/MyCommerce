import { UserNegative } from '@/types/userType';
import { authFirebase, dbFirebase } from "../config"

export const dbGetUsers = (value: string): Promise<{ name: string, data: UserNegative, uidCart: string, uidUser: string }[]> => {
  return new Promise((resolve, reject) => {
    let list: any[] = []
    let valueLower = value.toLocaleLowerCase()
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('ListUsers')
          .orderBy('name')
          .startAt(valueLower).endAt(valueLower + '\uf8ff')
          .get()
          .then((users) => {
            list = users.docs.map((user) => ({
              name: user.data().name,
              data: {
                name: user.data().data.name,
                phone: user.data().data.phone
              },
              uidCart: user.data().uid,
              uidUser: user.id
            }))
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