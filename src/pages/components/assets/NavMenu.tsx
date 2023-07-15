import { IconBag, IconCart, IconUserNegative } from "../../../../public/icons/icons";
import Link from "next/link";

export default function NavMenu() {
  return (
    <div className="flex items-center w-full h-full">
      <Link href={'/products'} className="flex flex-col items-center justify-center w-1/3">
        <i className="text-white">{IconBag}</i>
        <span className="text-sm text-white">Produtos</span>
      </Link>
      <hr className="h-4/5 border-l border-white" />
      <Link href={'/cart'} className="flex flex-col items-center justify-center w-1/3">
        <i className="text-white">{IconCart}</i>
        <span className="text-sm text-white">Carrinho</span>
      </Link>
      <hr className="h-4/5 border-l border-white" />
      <Link href={'/userNegative'} className="flex flex-col items-center justify-center w-1/3">
        <i className="text-white">{IconUserNegative}</i>
        <span className="text-sm text-white">Fiado</span>
      </Link>
    </div>
  )
}