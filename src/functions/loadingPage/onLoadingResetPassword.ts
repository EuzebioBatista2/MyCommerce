import { toastComponent } from "../toasts/Toast"
import { IIsValidResetPassword } from "@/types/isValidType"
import { resetPassword } from "../../../backend/auth/resetPassword"
import { verifyEmailWithGoogle } from "../verifyFields/verifyEmailWithGoogle"

export async function onLoadingResetPassword(loading: any, event: React.FormEvent<HTMLFormElement>, email: string ): Promise<IIsValidResetPassword> {
  event.preventDefault()
  loading(true)
  const isEmailValid = verifyEmailWithGoogle(email || '')

  if ( isEmailValid) {
    await resetPassword(event, email)
      .then(() => {
        toastComponent({ type: 'success' }, 'Um email de redefinição de senha foi enviado para o seu endereço de email!')
      })
      .catch(() => {})
  }
  loading(false)

  return ({isEmailValid})
}
