import { authFirebase, dbFirebase } from "../config"

// Função responsável por pegar a quantidade de produtos cadastrados
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
        window.location.href = '/'
      }
    })
  })
}

// Função responsável por pegar a quantidade de usuários cadastrados
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
        window.location.href = '/'
      }
    })
  })
}