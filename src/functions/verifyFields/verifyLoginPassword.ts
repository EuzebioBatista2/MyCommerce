import { toastComponent } from "../toasts/Toast"

// Função responsável por verificar se a senha no login é valida
export const verifyLoginPassword = (inputPassword: string ): boolean => {
  if (inputPassword !== '') {
    return true
  } else if(inputPassword === '') {
    toastComponent({type: 'error'}, 'Campo de senha vazio!')
  }
  return false
}