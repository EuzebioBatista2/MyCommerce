import { toastComponent } from "../toasts/Toast"

export const verifyName = (nameInput: string ): boolean => {
  if ( (nameInput.length >= 4 && nameInput.length < 70 )) {
    return true
  } else if(nameInput === '') {
    toastComponent({type: 'error'}, 'Erro no campo Name!')
  }
  return false
}