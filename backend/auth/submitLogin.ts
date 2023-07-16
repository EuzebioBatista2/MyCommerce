import { UserType } from "@/types/userType";
import { authFirebase, providerGoogle } from "../config";
import { toastComponent } from "@/functions/toasts/Toast";

// Função responsável por lidar com o login manual padrão
export function submitLogin(event: React.FormEvent<HTMLFormElement>, data: UserType): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    const inputEmail = data.email ? data.email : ''
    const inputPassword = data.password ? data.password : ''

    // Verifica se o login é da plataforma Gmail
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