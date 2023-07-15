import Link from "next/link";
import { IconBag, IconCart, IconUserNegative } from "../../../../public/icons/icons";
import Image from "next/image";

export default function NavMenuMd() {
  return (
    <div className="hidden md:flex md:w-1/3">
          <div className="flex flex-col items-center w-1/5 gap-4 py-4 bg-blue-600">
            <Link href={'/products'} className="flex flex-col items-center justify-center w-1/3">
              <i className="flex h-8 w-8 text-white">{IconBag}</i>
              <span className="text-base text-white">Produtos</span>
            </Link>
            <Link href={'/cart'} className="flex flex-col items-center justify-center w-1/3">
              <i className="flex h-8 w-8 text-white">{IconCart}</i>
              <span className="text-base text-white">Carrinho</span>
            </Link>
            <Link href={'/userNegative'} className="flex flex-col items-center justify-center w-1/3">
              <i className="flex h-8 w-8 text-white">{IconUserNegative}</i>
              <span className="text-base text-white">Fiado</span>
            </Link>
          </div>
          <div className="w-4/5 bg-white">
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