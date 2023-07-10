import { useEffect, useState } from "react"
import { dbGetAmountProducts, dbGetAmountUsers } from "../../../../backend/db/dbDataHome";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";

export default function DisplayValuesDataHome() {
  const [amountProducts, setAmountProducts] = useState(0)
  const [amountUsers, setAmountUsers] = useState(0)

  const { setLoading } = useLoadingReducer()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dbGetAmountProducts().then((data) => {
        setAmountProducts(data)
      });
      await dbGetAmountUsers().then((data) => {
        setAmountUsers(data)
      });
      setLoading(false)
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col w-full">
      <span>Quantidade de produtos: {amountProducts}</span>
      <span>Usuários em dívida: {amountUsers}</span>
    </div>
  )
}