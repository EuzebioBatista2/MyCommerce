import { toastComponent } from "../toasts/Toast"

export const verifyPrice = (value: number): boolean => {
  if(value == 0) {
    toastComponent({type: 'error'}, 'Campo de preço não pode ser vázio')
    return false
  }
  return true
}