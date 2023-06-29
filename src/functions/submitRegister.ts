import { RegisterType } from '@/types/registerType';
import { authFirebase, storageFirebase } from '../../backend/config';

export function submitRegister(event: React.FormEvent<HTMLFormElement>, data: RegisterType): Promise<void> {
  return new Promise(async (resolve, reject) => {
    event.preventDefault()
    const inputName = data.name ? data.name : ''
    const inputEmail = data.email ? data.email : ''
    const inputPassword = data.password ? data.password : ''
    const image = data.image ? data.image : ''

    authFirebase.createUserWithEmailAndPassword(inputEmail, inputPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          return user.updateProfile({
            displayName: inputName,
            photoURL: image.value
          });
        }
      })
      .then(() => {
        const urlImage = storageFirebase.ref(`myCommerceFiles/${authFirebase.currentUser?.uid}/${image[0].name}`);
        if (image[0].name !== '') {
          urlImage.put(image[0]);
        }
        resolve()
      })
      .catch(() => {
        reject()
      });
  }
  )
}