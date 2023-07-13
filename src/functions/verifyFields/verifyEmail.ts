import { toastComponent } from "../toasts/Toast";

export const verifyEmail = (emailInput: string): boolean => {
  if (emailInput.includes('@gmail')) {
    toastComponent({type: 'error'}, 'Caso sua conta seja gmail, utilize o login com a conta GOOGLE')
    return false
  }
  else if ( emailInput.match(/[\w\.\+]+@[\w]+\.[\w]+(\.[\w]+)?/g)) {
    return true
  } else {
    toastComponent({type: 'error'}, 'Erro no campo Email!')
  }
  return false
};