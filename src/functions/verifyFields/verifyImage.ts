import { toastComponent } from "../toasts/Toast"

// Função responsável por verificar se a iamgem inserida é valida
export const verifyImage = (inputImage: any): boolean => {
  if(inputImage && inputImage.name !== '') {
    if(inputImage.type.includes('image')) {
      if(inputImage.size < (1024 * 1024 * 2)) {
        return true
      } else {
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