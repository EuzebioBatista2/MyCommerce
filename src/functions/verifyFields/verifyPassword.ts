import { toastComponent } from "../toasts/Toast"

export const verifyPassword = (inputPassword: string, inputConfirmPassword: string ): boolean => {
  if (inputPassword === inputConfirmPassword && (inputPassword !== '' && inputConfirmPassword !== '')) {
    return true
  } else if(inputPassword === '' || inputConfirmPassword === '') {
    toastComponent({type: 'error'}, 'Senhas não conferem!')
  }
  return false
}