import { useLoadingReducer } from '@/store/reducers/loadingReducers/useLoadingReducer';
import { authFirebase, storageFirebase } from '../../backend/config';
import { verifyEmail } from "./verifyFields/verifyEmail"
import { verifyImage } from "./verifyFields/verifyImage"
import { verifyName } from "./verifyFields/verifyName"
import { verifyPassword } from "./verifyFields/verifyPassword"

export function submitRegister(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const name = document.querySelector<HTMLInputElement>('#name')
  const email = document.querySelector<HTMLInputElement>('#email')
  const password = document.querySelector<HTMLInputElement>('#password')
  const confirmPassword = document.querySelector<HTMLInputElement>('#confirmPassword')
  const image = document.querySelector<HTMLInputElement>('#file')

  const isNameValid = verifyName(name);
  const isEmailValid = verifyEmail(email);
  const isPasswordValid =  verifyPassword(password, confirmPassword);
  const isImageValid = verifyImage(image);
  
  if (isNameValid && isEmailValid && isPasswordValid && isImageValid) {
    if (email && password && name && image) {
      authFirebase.createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
          const user = userCredential.user;

          if (user) {
            return user.updateProfile({
              displayName: name.value,
              photoURL: image.value
            });
          }
        })
        .then(() => {
          const urlImage = storageFirebase.ref(`myCommerceFiles/${authFirebase.currentUser?.uid}/${image.files?.[0].name}`);
          if (image.files?.[0]) {
            urlImage.put(image.files?.[0]);
          }
        })
        .catch((error) => {
          // Tratar erros
          console.error('Erro ao criar usuário:', error);
        });
    }
  }
}