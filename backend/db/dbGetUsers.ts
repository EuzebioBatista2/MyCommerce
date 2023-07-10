import { UserNegative } from '@/types/userType';
import { authFirebase, dbFirebase } from "../config"

export const dbGetUsers = (): Promise<{ name: string, data: UserNegative, uidCart: string, uidUser: string }[]> => {
  return new Promise((resolve, reject) => {
    let list: any[] = []
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('ListUsers').get().then((users) => {
          list = users.docs.map((user) => ({
            name: user.data().name,
            data: {
              name: user.data().data.name,
              phone: user.data().data.phone
            },
            uidCart: user.data().uid,
            uidUser: user.id
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

export const dbGetUser = (userUid: string): Promise<{ name: string, data: UserNegative, uidCart: string, uidUser: string }> => {
  return new Promise((resolve, reject) => {
    let user = ''
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('ListUsers').doc(userUid).get().then((user) => {
          console.log(user.data())
        })
        
      } else {
        reject(new Error('User not authenticated'))
      }
    })
  })
}