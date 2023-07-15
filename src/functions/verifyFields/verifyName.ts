import { toastComponent } from "../toasts/Toast"

export const verifyName = (nameInput: string ): boolean => {
  if ( (nameInput.length >= 3 && nameInput.length < 25 )) {
    return true
  } else {
    toastComponent({type: 'error'}, 'Erro no campo Name. Limite permitido - Max 25 Caract!')
  }
  return false
}