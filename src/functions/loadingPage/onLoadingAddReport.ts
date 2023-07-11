import { dbAddReport } from "../../../backend/db/dbAddReport";
import { toastComponent } from "../toasts/Toast";

export async function onLoadingAddReport(loading: any, userName: string): Promise<void> {
  loading(true)
  await dbAddReport(userName)
  toastComponent({ type: 'success' }, 'Venda realizada com sucesso!')
  loading(false)
}