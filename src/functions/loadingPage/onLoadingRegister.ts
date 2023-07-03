import { NextRouter } from "next/router"
import { verifyName } from "../verifyFields/verifyName"
import { verifyEmail } from "../verifyFields/verifyEmail"
import { verifyConfirmPassword } from "../verifyFields/verifyConfirmPassword"
import { verifyImage } from "../verifyFields/verifyImage"
import { RegisterType } from "@/types/registerType"
import { submitRegister } from "../../../backend/auth/submitRegister"
import { toastComponent } from "../toasts/Toast"
import { IIsValidAuthType } from "@/types/isValidType"

export async function onLoadingRegister(loading: any, event: React.FormEvent<HTMLFormElement>, router: NextRouter, data: RegisterType): Promise<IIsValidAuthType> {
  event.preventDefault()
  loading(true)
  const isNameValid = verifyName(data.name || '')
  const isEmailValid = verifyEmail(data.email || '')
  const isPasswordValid = verifyConfirmPassword(data.password || '', data.confirmPassword || '')
  const isImageValid = verifyImage(data.image || '')

  if (isNameValid && isEmailValid && isPasswordValid && isImageValid) {
    await submitRegister(event, data)
      .then(() => {
        toastComponent({ type: 'success' }, 'Cadastro realizado com sucesso!')
        router.push('/')
      })
      .catch(() => {})
  }
  loading(false)

  return ({isNameValid, isEmailValid, isPasswordValid, isImageValid})
}

//(event: React.FormEvent<HTMLFormElement>) => OnloadingRegister(event)