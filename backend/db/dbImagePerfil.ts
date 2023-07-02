import { authFirebase, dbFirebase } from "../config";

export function dbImagePerfil() {
  return new Promise((resolve, reject) => {
    dbFirebase.doc(authFirebase.currentUser?.uid).collection('ImageUser').get()
      .then((data) => {
        let urlImg = '';
        data.forEach((doc) => {
          urlImg = doc.data().imgUrl;
        });
        resolve(urlImg);
      })
      .catch((error) => {
        console.error('Erro ao obter a imagem do perfil:', error);
        reject(error);
      });
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