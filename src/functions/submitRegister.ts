import { authFirebase } from "../../backend/config"
import { verifyEmail } from "./verifyFields/verifyEmail"
import { verifyImage } from "./verifyFields/verifyImage"
import { verifyName } from "./verifyFields/verifyName"
import { verifyPassword } from "./verifyFields/verifyPassword"

export async function submitRegister(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const name = document.querySelector<HTMLInputElement>('#name')
  const email = document.querySelector<HTMLInputElement>('#email')
  const password = document.querySelector<HTMLInputElement>('#password')
  const confirmPassword = document.querySelector<HTMLInputElement>('#confirmPassword')
  const image = document.querySelector<HTMLInputElement>('#file')

  const isNameValid = await verifyName(name);
  const isEmailValid = await verifyEmail(email);
  const isPasswordValid = await verifyPassword(password, confirmPassword);
  const isImageValid = await verifyImage(image);

  if (isNameValid && isEmailValid && isPasswordValid && isImageValid) {
    if (email && password) {
      authFirebase(email?.value, password?.value)
    }
  }
}