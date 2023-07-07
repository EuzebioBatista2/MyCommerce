import { IconBag, IconCart, IconUserNegative } from "../../../../public/icons/icons";
import Link from "next/link";

export default function NavMenu() {
  return (
    <div className="flex items-center w-full h-full">
      <Link href={'/products'} className="flex flex-col items-center justify-center w-1/3">
        <i>{IconBag}</i>
        <span>Produtos</span>
      </Link>
      <hr className="h-4/5 border border-black" />
      <Link href={'/cart'} className="flex flex-col items-center justify-center w-1/3">
        <i>{IconCart}</i>
        <span>Carrinho</span>
      </Link>
      <hr className="h-4/5 border border-black" />
      <div className="flex flex-col items-center justify-center w-1/3">
        <i>{IconUserNegative}</i>
        <span>Fiado</span>
      </div>
    </div>
  )
}