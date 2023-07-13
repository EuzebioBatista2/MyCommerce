import { useEffect, useState } from "react"
import { dbGetAmountProducts, dbGetAmountUsers } from "../../../../backend/db/dbDataHome";
import { authFirebase } from "../../../../backend/config";

export default function DisplayValuesDataHome() {
  const [amountProducts, setAmountProducts] = useState(0)
  const [amountUsers, setAmountUsers] = useState(0)


  useEffect(() => {
    const fetchData = () => {
      authFirebase.onAuthStateChanged(async (user) => {
        if(user) {
          await dbGetAmountProducts().then((data) => {
            setAmountProducts(data)
          });
          await dbGetAmountUsers().then((data) => {
            setAmountUsers(data)
          });
        } else {
          window.location.href = '/'
        }
      })
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const remember = localStorage.getItem('rememberMyAccontMyCommerce')
    if ( remember === "false" ) {
      const handleBeforeUnload = () => {
        authFirebase.signOut();
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      <span>Quantidade de produtos: {amountProducts}</span>
      <span>Usuários em dívida: {amountUsers}</span>
    </div>
  )
}