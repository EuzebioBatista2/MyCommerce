import { toastComponent } from "../toasts/Toast"

// Função responsável por verificar se os dados da senha e confirmar senha são iguais e validos
export const verifyConfirmPassword = (inputPassword: string, inputConfirmPassword: string ): boolean => {
  if (inputPassword === inputConfirmPassword && (inputPassword !== '' && inputConfirmPassword !== '')) {
    if (inputPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!&^*]).{6,20}$/g)) {
      return true
    } else {
      toastComponent({type: 'error'}, 'A senha deve conter pelo menos 1 caractere minúsculo, 1 maiúsculo, 1 dígito e 1 caractere especial.')
      return false
    }
  } else if(inputPassword === '' || inputConfirmPassword === '') {
    toastComponent({type: 'error'}, 'Senhas não conferem!')
  }
  return false
}