import { toastComponent } from "../toasts/Toast";

// Função responsável por verificar o e-mail no resetPassword de forma que permita a plataforma padrão e Google
export const verifyEmailWithGoogle = (emailInput: string): boolean => {
  if ( emailInput.match(/[\w\.\+]+@[\w]+\.[\w]+(\.[\w]+)?/g)) {
    return true
  } else {
    toastComponent({type: 'error'}, 'Erro no campo Email!')
  }
  return false
};