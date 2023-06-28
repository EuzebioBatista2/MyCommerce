import { toastComponent } from "../toasts/Toast";

export const verifyEmail = (emailInput: string): boolean => {
  if ( emailInput.match(/[\w\.\+]+@[\w]+\.[\w]+(\.[\w]+)?/g)) {
    return true
  } else if (emailInput === '') {
    toastComponent({type: 'error'}, 'Erro no campo Email!')
  }
  return false
};