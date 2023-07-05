import { toastComponent } from "../toasts/Toast";

export const verifyAmount = (value: number): boolean => {
  const isValid = value.toString().indexOf('.');
  if (value == 0) {
    toastComponent({type: 'error'}, 'Campo de quantidade não pode ser vázio')
    return false
  }
  if (isValid !== -1) {
    toastComponent({type: 'error'}, 'Valor não é inteiro')
    return false
  }
  return true
}