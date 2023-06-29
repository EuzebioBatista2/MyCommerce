import { UserType } from "@/types/userType";
import { authFirebase } from "../../backend/config";

export function submitLogin(event: React.FormEvent<HTMLFormElement>, data: UserType): Promise<void> {
  return new Promise((resolve, reject) => {
    event.preventDefault()
    const inputEmail = data.email ? data.email : ''
    const inputPassword = data.password ? data.password : ''

    authFirebase
      .signInWithEmailAndPassword(inputEmail, inputPassword)
      .then(() => resolve())
      .catch(() => reject())
  })
}