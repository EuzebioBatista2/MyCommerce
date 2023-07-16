import Link from "next/link";
import { IconBag, IconCart, IconUserNegative } from "../../../../public/icons/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dbGetCart } from "../../../../backend/db/dbGetCart";

export default function NavMenuMd() {

  const [amountProduct, setAmountProduct] = useState<number>(0)

  useEffect(() => {
    // Função responsável por pegar a quantidade de produtos dentro do carrinho principal
    dbGetCart().then((list) => {
      setAmountProduct(list.length)
    })
  }, [])
  return (
    <div className="hidden md:flex md:w-1/3">
          <div className="flex flex-col items-center w-1/4 gap-4 py-4 bg-blue-600">
            <Link href={'/products'} className="flex flex-col items-center justify-center w-full py-1 hover:bg-blue-800 transition duration-500 ease-in-out">
              <i className="flex h-8 w-8 text-white">{IconBag}</i>
              <span className="text-base text-white">Produtos</span>
            </Link>
            <Link href={'/cart'} className="flex flex-col items-center justify-center w-full py-1 hover:bg-blue-800 relative transition duration-500 ease-in-out">
              <span className="text-xs text-white leading-none absolute px-1.5 py-1 bg-red-600 rounded-full top-0.5 left-2/4 ml-1">{amountProduct}</span>
              <i className="flex h-8 w-8 text-white">{IconCart}</i>
              <span className="text-base text-white">Carrinho</span>
            </Link>
            <Link href={'/userNegative'} className="flex flex-col items-center justify-center w-full py-1 hover:bg-blue-800 transition duration-500 ease-in-out">
              <i className="flex h-8 w-8 text-white">{IconUserNegative}</i>
              <span className="text-base text-white">Fiado</span>
            </Link>
          </div>
          <div className="w-3/4 bg-white">
            <div className="flex items-center justify-center h-1/4">
              <div className='h-4/5 w-2/5'>
                <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={160} height={140} priority={true} className='w-auto h-auto' />
              </div>
            </div>
            <div className="h-3/4 bg-[url('/cartGif.gif')] bg-center bg-no-repeat"></div>
          </div>
        </div>
  )
}