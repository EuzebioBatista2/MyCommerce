import { RegisterType } from '@/types/registerType';
import { authFirebase, storageFirebase } from '../config';

// Função responsavél pelo registro de e-mail padrão do firebase
export function submitRegister(event: React.FormEvent<HTMLFormElement>, data: RegisterType): Promise<void> {
  return new Promise(async (resolve, reject) => {
    event.preventDefault()
    
    //  Dados vindo do formulário
    const inputName = data.name ? data.name : ''
    const inputEmail = data.email ? data.email : ''
    const inputPassword = data.password ? data.password : ''
    const image = data.image ? data.image : ''

    authFirebase.createUserWithEmailAndPassword(inputEmail, inputPassword)
      .then(() => {
        let imageUrl: any
        const urlImage = storageFirebase.ref(`myCommerceFiles/${authFirebase.currentUser?.uid}/mainImage/${image[0].name}`);
        if (image[0].name !== '') {
          // Verificação do upload quando concluída
          const upload = urlImage.put(image[0]);
          upload.on('state_changed', () => { }, () => { }, () => {
            urlImage.getDownloadURL().then((downloadURL) => {
              imageUrl = downloadURL
              authFirebase.onAuthStateChanged((user) => {
                if (user) {
                  // Atualização dos dados da conta nome e URL da foto
                  user.updateProfile({
                    displayName: inputName,
                    photoURL: imageUrl
                  });
                  resolve()
                }
              })
            })
          })
        }
      })
      .catch(() => {
        reject()
      });
  }
  )
}