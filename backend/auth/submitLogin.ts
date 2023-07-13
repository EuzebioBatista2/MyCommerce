import { UserType } from "@/types/userType";
import { authFirebase, providerGoogle } from "../config";
import { toastComponent } from "@/functions/toasts/Toast";

export function submitLogin(event: React.FormEvent<HTMLFormElement>, data: UserType, loading: any): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    const inputEmail = data.email ? data.email : ''
    const inputPassword = data.password ? data.password : ''

    const isGmail = inputEmail.includes("@gmail.com");

    if (isGmail) {
      toastComponent({ type: 'warning' }, 'Login da plataforma GMAIL detectado!')
      authFirebase.signInWithPopup(providerGoogle)
      .then(() => {
        toastComponent({ type: 'success' }, 'Login realizado com sucesso!')
        resolve()
      }).catch(() => {
        reject()
      })
    }
    else {
      authFirebase
        .signInWithEmailAndPassword(inputEmail, inputPassword)
        .then(() => resolve())
        .catch(() => reject())
    }
  })
}