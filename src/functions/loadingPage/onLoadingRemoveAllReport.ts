import { authFirebase, dbFirebase } from "../../../backend/config";
import { toastComponent } from "../toasts/Toast";

// Função responsável por carregar o loading enquanto exclui todos os dados da tabela de relátorio
export function onLoadingRemoveAllReport(loading: any): Promise<void> {
  return new Promise((resolve, reject) => {
    loading(true)
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Report').get().then((users) => {
          users.docs.map((userName) => {
            dbFirebase.doc(user.uid).collection('Report').doc(userName.id).delete()
          })
        })
      }
    })
    toastComponent({ type: 'success' }, 'Relatorio de vendas excluído com sucesso!')
    loading(false)
    resolve()
  })

}