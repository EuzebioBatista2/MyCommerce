import { toastComponent } from "../toasts/Toast"

export const verifyLoginPassword = (inputPassword: string ): boolean => {
  if (inputPassword !== '') {
    return true
  } else if(inputPassword === '') {
    toastComponent({type: 'error'}, 'Campo de senha vazio!')
  }
  return false
}