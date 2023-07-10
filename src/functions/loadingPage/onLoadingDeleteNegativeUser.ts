import { authFirebase, dbFirebase } from "../../../backend/config"
import { toastComponent } from "../toasts/Toast"

export async function onLoadingDeleteNegativeUser(loading: any, uidUser: string, uidCart: string): Promise<void> {
  loading(true)
  await authFirebase.onAuthStateChanged((user) => {
    dbFirebase.doc(user?.uid).collection('ListUsersProducts').doc(uidCart).delete().then(() => {
    })
  })
  await authFirebase.onAuthStateChanged((user) => {
    dbFirebase.doc(user?.uid).collection('ListUsers').doc(uidUser).delete().then(() => {
      toastComponent({ type: 'success' }, `Usuário excluído com sucesso!`)
    })
  })
  loading(false)
}