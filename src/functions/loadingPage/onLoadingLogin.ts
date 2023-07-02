import { IIsValidType } from "@/types/isValidType";
import { UserType } from "@/types/userType";
import { NextRouter } from "next/router";
import { verifyEmail } from "../verifyFields/verifyEmail";
import { verifyPassword } from "../verifyFields/verifyPassword";
import { submitLogin } from "../../../backend/auth/submitLogin";
import { toastComponent } from "../toasts/Toast";

export async function onLoadingLogin(
  loading: (value: boolean) => void, 
  event: React.FormEvent<HTMLFormElement>, 
  router: NextRouter,
  data: UserType): Promise<IIsValidType> {
    event.preventDefault()
    loading(true)

    const isEmailValid = verifyEmail(data.email || '')
    const isPasswordValid = verifyPassword(data.password || '')

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