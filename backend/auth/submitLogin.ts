import { UserType } from "@/types/userType";
import { authFirebase, providerGoogle } from "../config";
import { toastComponent } from "@/functions/toasts/Toast";

// Função responsável por lidar com o login manual padrão
export function submitLogin(event: React.FormEvent<HTMLFormElement>, data: UserType): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    const inputEmail = data.email ? data.email : ''
    const inputPassword = data.password ? data.password : ''

    authFirebase.signInWithEmailAndPassword(inputEmail, inputPassword)
        .then(() => {
          toastComponent({ type: 'success' }, 'Login realizado com sucesso!')
          resolve()
        })
        .catch(() => reject())
  })
}