import { authFirebase } from "../config";

// Função responsável por pegar a URL da imagem do usuário logado
export function dbImagePerfil() {
  return new Promise((resolve, reject) => {
    authFirebase.onAuthStateChanged((user) => {
      if(user?.photoURL) {
        resolve(user.photoURL)
      }
    })
  });
}

// Função responsável por pegar os dados do usuário logado
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