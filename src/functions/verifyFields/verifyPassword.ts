import { toastComponent } from "../toasts/Toast"

export const verifyPassword = (inputPassword: HTMLInputElement | null, inputConfirmPassword: HTMLInputElement | null ): boolean => {
  if ((inputPassword && inputConfirmPassword) && inputPassword.value === inputConfirmPassword.value && (inputPassword.value !== '' && inputConfirmPassword.value !== '')) {
    inputPassword.className = `${inputPassword.className.replace('text-red-500 border-red-500', '')}`
    inputConfirmPassword.className = `${inputConfirmPassword.className.replace('text-red-500 border-red-500', '')}`
    return true
  } else if(inputPassword && inputConfirmPassword) {
    inputPassword.className += " text-red-500 border-red-500"
    inputConfirmPassword.className += " text-red-500 border-red-500"
    toastComponent({type: 'error'}, 'Senhas não conferem!')
  }
  return false
}