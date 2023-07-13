import { authFirebase } from "../config";

export function dbImagePerfil() {
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      if(user?.photoURL) {
        resolve(user.photoURL)
      }
    })
  });
}

export function dbNamePerfil() {
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      if(user) {
        resolve(user.displayName)
      } else {
        reject()
      }
    })
  })
}