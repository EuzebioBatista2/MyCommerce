import { toastComponent } from "../toasts/Toast";

export const verifyAmount = (value: number): boolean => {
  const isValid = value.toString().indexOf('.');
  if (value <= 0) {
    toastComponent({type: 'error'}, 'Campo de quantidade não pode ser zero ou negativo')
    return false
  }
  if (isValid !== -1) {
    toastComponent({type: 'error'}, 'Valor não é inteiro')
    return false
  }
  if (value > 99999) {
    toastComponent({type: 'error'}, 'Erro no campo Quantidade. Limite permitido - Max 99999 Caract ')
    return false
  }
  return true
}