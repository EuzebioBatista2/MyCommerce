import { IIsValidCreateUser, IIsValidProductType } from "@/types/isValidType";
import { NextRouter } from "next/router";
import { toastComponent } from "../toasts/Toast";
import { verifyName } from "../verifyFields/verifyName";
import { dbCreateUser } from "../../../backend/db/dbCreateUser";
import { UserNegative } from "@/types/userType";

export async function onLoadingCreateUser(loading: any, event: React.FormEvent<HTMLFormElement>, router: NextRouter, data: UserNegative): Promise<IIsValidCreateUser> {
  event.preventDefault()
  loading(true)
  const isNameValid = verifyName(data.name)
  const isPhoneValid = verifyName(data.phone)

  if(isNameValid && isPhoneValid ) {
    await dbCreateUser(data, event)
      .then(() => {
        toastComponent({ type: 'success' }, 'Usuário cadastrado com sucesso!')
        router.push('/home')
      })
  }
  loading(false)
  return ({ isNameValid, isPhoneValid })
}