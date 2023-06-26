import { toastComponent } from "../toasts/Toast"

export const verifyName = (nameInput: HTMLInputElement | null): boolean => {
  if ( nameInput && (nameInput.value.length >= 4 && nameInput.value.length < 70 )) {
    nameInput.className = `${nameInput.className.replace('text-red-500 border-red-500', '')}`
    return true
  } else if(nameInput) {
    nameInput.className += " text-red-500 border-red-500"
    toastComponent({type: 'error'}, 'Erro no campo Name!')
  }
  return false
}