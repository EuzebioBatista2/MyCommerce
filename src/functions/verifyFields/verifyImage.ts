import { toastComponent } from "../toasts/Toast"

export const verifyImage = (inputImage: HTMLInputElement | null): boolean => {
  if(inputImage && inputImage.files?.[0]) {
    inputImage.className = `${inputImage.className.replace('text-red-500 border-red-500', '')}`
    return true
  } else if(inputImage) {
    inputImage.className += " text-red-500 border-red-500"
    toastComponent({type: 'error'}, 'Campo de imagem vazio!')
  }
  return false
}