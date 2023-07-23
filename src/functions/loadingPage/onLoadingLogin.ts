import { IIsValidAuthType } from "@/types/isValidType";
import { UserType } from "@/types/userType";
import { NextRouter } from "next/router";
import { submitLogin } from "../../../backend/auth/submitLogin";
import { toastComponent } from "../toasts/Toast";
import { verifyLoginPassword } from "../verifyFields/verifyLoginPassword";
import { verifyEmailWithGoogle } from "../verifyFields/verifyEmailWithGoogle";

// Função responsável por carregar o loading enquanto o usuário realiza o login
export async function onLoadingLogin(
  loading: (value: boolean) => void, 
  event: React.FormEvent<HTMLFormElement>, 
  router: NextRouter,
  data: UserType): Promise<IIsValidAuthType> {
    event.preventDefault()
    loading(true)

    const isEmailValid = verifyEmailWithGoogle(data.email || '')
    const isPasswordValid = verifyLoginPassword(data.password || '')

    if (isEmailValid && isPasswordValid) {
      await submitLogin(event, data)
      .then(() => {
        router.push('/home')
      })
      .catch(() => {
        toastComponent({ type: 'error' }, 'Login ou senha invalido(s)!')
      })
    }
    loading(false)
    return ({isEmailValid, isPasswordValid})
}