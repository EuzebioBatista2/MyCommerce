import { dbAddReport } from "../../../backend/db/dbAddReport";
import { dbGetCart } from "../../../backend/db/dbGetCart";
import { toastComponent } from "../toasts/Toast";
import { onLoadingDeleteCartAll } from "./onLoadingDeleteCart";

// Função responsável por carregar o loading enquanto os dados da tabela de carrinho principal são transferidos para tabela de relátorio(Ou não)
export async function onLoadingAddReport(loading: any, userName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    loading(true)
    // Verificar se no carrinho há mais de um produto
    dbGetCart().then(async (list) => {
      console.log(list.length)
      if (list.length > 0) {
        await dbAddReport(userName)
        await onLoadingDeleteCartAll(loading)
        toastComponent({ type: 'success' }, 'Venda realizada com sucesso!')
        loading(false)
        resolve()
      } else {
        toastComponent({ type: 'error' }, 'Não há produtos no carrinho!')
        loading(false)
        reject()
      }
    })
  })

}