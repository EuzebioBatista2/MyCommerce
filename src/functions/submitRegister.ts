import { authFirebase, storageFirebase } from '../../backend/config';

export interface IDataForm {
  name?: string
  email: string | undefined
  password: string | undefined
  confirmPassword?: string | undefined
  image?: any
}

export function submitRegister(event: React.FormEvent<HTMLFormElement>, props: IDataForm): Promise<void> {
  return new Promise(async (resolve, reject) => {
    event.preventDefault()
    const inputName = props.name ? props.name : ''
    const inputEmail = props.email ? props.email : ''
    const inputPassword = props.password ? props.password : ''
    const image = props.image ? props.image : ''

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