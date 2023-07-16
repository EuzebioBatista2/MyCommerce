import { showErrorFirebase } from "@/functions/verifyFields/showErrorFireseba"
import { authFirebase } from "../config"

// Objeto que armazena a URL do botão de retorno
let actionCodeSettings = {
  url: 'https://my-commerce-euzebiobatista2.vercel.app/'
}

// Função responsavel por enviar um e-mail com o reset de senha
export function resetPassword(event: React.FormEvent<HTMLFormElement>, email: string): Promise<void> {
  event.preventDefault()
  return new Promise((resolve, reject) => {
    authFirebase.sendPasswordResetEmail(email, actionCodeSettings).then(() => {
      resolve()
    }).catch((error) => {
      showErrorFirebase(error)
      resolve()
    })
  })
}