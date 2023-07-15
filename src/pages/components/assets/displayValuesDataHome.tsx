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
    <div className="flex items-center justify-center flex-col w-full">
      <span className="text-sm md:text-lg">Quantidade de produtos: <strong>{amountProducts}</strong></span>
      <span className="text-sm md:text-lg">Usuários em dívida: <strong>{amountUsers}</strong></span>
    </div>
  )
}