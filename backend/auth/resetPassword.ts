import { showErrorFirebase } from "@/functions/verifyFields/showErrorFireseba"
import { authFirebase } from "../config"

let actionCodeSettings = {
  url: 'http://192.168.15.29:3000/'
}

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