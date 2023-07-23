import { useEffect, useState } from "react";
import { IconBag, IconCart, IconUserNegative } from "../../../../public/icons/icons";
import Link from "next/link";
import { dbGetCart } from "../../../../backend/db/dbGetCart";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";

export default function NavMenu() {

  const [amountProduct, setAmountProduct] = useState<number>(0)
  
  const {loading} = useLoadingReducer()

  useEffect(() => {
    // Função responsável por pegar a quantidade de produtos dentro do carrinho principal
    dbGetCart().then((list) => {
      setAmountProduct(list.length)
    })
  }, [loading])
  return (
    <div className="flex items-center w-full h-full">
      <Link href={'/products'} className="flex flex-col items-center justify-center w-1/3 h-full">
        <i className="flex h-6 w-6 text-white">{IconBag}</i>
        <span className="text-sm text-white">Produtos</span>
      </Link>
      <hr className="h-4/5 border-l border-white" />
      <Link href={'/cart'} className="flex flex-col items-center justify-center w-1/3 h-full relative">
        <span className="text-xs text-white leading-none absolute px-1.5 py-1 bg-red-600 rounded-full top-1 left-2/4 ml-1">{amountProduct}</span>
        <i className="flex h-6 w-6 text-white">{IconCart}</i>
        <span className="text-sm text-white">Carrinho</span>
      </Link>
      <hr className="h-4/5 border-l border-white" />
      <Link href={'/userNegative'} className="flex flex-col items-center justify-center w-1/3 h-full">
        <i className="flex h-6 w-6 text-white">{IconUserNegative}</i>
        <span className="text-sm text-white">Fiado</span>
      </Link>
    </div>
  )
}