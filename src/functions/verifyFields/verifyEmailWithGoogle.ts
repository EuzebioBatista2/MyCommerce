import { toastComponent } from "../toasts/Toast";

export const verifyEmailWithGoogle = (emailInput: string): boolean => {
  if ( emailInput.match(/[\w\.\+]+@[\w]+\.[\w]+(\.[\w]+)?/g)) {
    return true
  } else {
    toastComponent({type: 'error'}, 'Erro no campo Email!')
  }
  return false
};