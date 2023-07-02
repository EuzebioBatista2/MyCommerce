import { IconBag, IconSell, IconUserNegative } from "../../../../public/icons/icons";

export default function NavMenu() {
  return (
    <div className="flex items-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-1/3">
        <i>{IconBag}</i>
        <span>Produtos</span>
      </div>
      <hr className="h-4/5 border border-black" />
      <div className="flex flex-col items-center justify-center w-1/3">
        <i>{IconSell}</i>
        <span>Vender</span>
      </div>
      <hr className="h-4/5 border border-black" />
      <div className="flex flex-col items-center justify-center w-1/3">
        <i>{IconUserNegative}</i>
        <span>Fiado</span>
      </div>
    </div>
  )
}