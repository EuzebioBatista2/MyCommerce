import { authFirebase, dbFirebase } from "../config"

export const dbGetAmountProducts = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    let values: number
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Products').get().then((products) => {
          values = products.size
          resolve(values)
        }, (error) => {
          reject(error)
        })
      } else {
        reject(new Error('User not authenticated'))
      }
    })
  })
}

export const dbGetAmountUsers = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    let values: number
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('ListUsers').get().then((products) => {
          values = products.size
          resolve(values)
        }, (error) => {
          reject(error)
        })
      } else {
        reject(new Error('User not authenticated'))
      }
    })
  })
}