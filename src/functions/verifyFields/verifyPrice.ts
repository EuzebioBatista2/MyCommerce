import { toastComponent } from "../toasts/Toast"

export const verifyPrice = (value: number): boolean => {
  if(value <= 0) {
    toastComponent({type: 'error'}, 'Erro no campo Preço - Não pode ser zero ou negativo')
    return false
  }
  if(value > 999999) {
    toastComponent({type: 'error'}, 'Erro no campo Preço - Limite permitido - Max 999999 Caract')
    return false
  }
  return true
}