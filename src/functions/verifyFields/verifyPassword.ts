import { toastComponent } from "../toasts/Toast"

export const verifyPassword = (inputPassword: string ): boolean => {
  if (inputPassword !== '') {
    return true
  } else if(inputPassword === '') {
    toastComponent({type: 'error'}, 'Senhas não conferem!')
  }
  return false
}