import { authFirebase, dbFirebase } from "../../../backend/config"
import { toastComponent } from "../toasts/Toast"

export async function onLoadingDeleteProductUser(loading: any, uidUser: string, uidCart: string): Promise<void> {
  loading(true)
  await authFirebase.onAuthStateChanged((user) => {
    dbFirebase.doc(user?.uid).collection('ListUsersProducts').doc(uidUser).collection('Products').doc(uidCart).delete().then(() => {
      toastComponent({ type: 'success' }, `Produto excluído com sucesso!`)
    })
  })
  loading(false)
}