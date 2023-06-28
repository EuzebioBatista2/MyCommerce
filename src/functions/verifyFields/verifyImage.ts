import { toastComponent } from "../toasts/Toast"

export const verifyImage = (inputImage: any): boolean => {
  if(inputImage && inputImage[0].name !== '') {
    return true
  } else if(inputImage === '') {
    toastComponent({type: 'error'}, 'Campo de imagem vazio!')
  }
  return false
}