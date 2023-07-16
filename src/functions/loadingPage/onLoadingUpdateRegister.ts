import { NextRouter } from "next/router"
import { verifyName } from "../verifyFields/verifyName"
import { verifyImage } from "../verifyFields/verifyImage"
import { toastComponent } from "../toasts/Toast"
import { IIsValidUpdateUser } from "@/types/isValidType"
import { submitUpdateRegister } from "../../../backend/auth/submitUpdateRegister"

// Função responsável por carregar o loading enquanto os dados do usuário são atualizado(Imagem e nome) 
export async function onLoadingUpdateRegister(loading: any, event: React.FormEvent<HTMLFormElement>, router: NextRouter, data: {userName: string, userImageSub: any}): Promise<IIsValidUpdateUser> {
  event.preventDefault()
  loading(true)
  let isImageValid: boolean
  const isNameValid = verifyName(data.userName || '')
  if(data.userImageSub) {
    isImageValid = verifyImage(data.userImageSub[0] || '')
  } else {
    isImageValid = true
  }

  if (isNameValid && isImageValid) {
    await submitUpdateRegister(event, data)
      .then(() => {
        toastComponent({ type: 'success' }, 'Dados atualizados com sucesso!')
        router.push('/home')
      })
      .catch(() => {})
  }

  return ({isNameValid, isImageValid})
}
