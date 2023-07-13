import { toastComponent } from "../toasts/Toast"

export const verifyImage = (inputImage: any): boolean => {
  console.log(inputImage)
  if(inputImage && inputImage.name !== '') {
    if(inputImage.type.includes('image')) {
      if(inputImage.size < (1024 * 1024 * 2)) {
        return true
      } else {
        console.log((inputImage.size / 1024 / 1024).toFixed(3))
        toastComponent({type: 'error'}, 'Limite de imagem permitida até 2MB!')
        return false
      }
    }
    else {
      toastComponent({type: 'error'}, 'Arquivo não é do tipo imagem!')
      return false
    }
  } else {
    toastComponent({type: 'error'}, 'Campo de imagem vazio!')
    return false
  }
}