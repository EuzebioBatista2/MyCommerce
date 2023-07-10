import { ProductType } from "@/types/productType";
import { dbAddReport } from "../../../backend/db/dbAddReport";

export async function onLoadingAddReport(loading: any): Promise<void> {
  loading(true)
  await dbAddReport()
  loading(false)
}