import { useEffect, useState } from "react";
import { IconClose, IconOptions } from "../../../../public/icons/icons";

interface IMenuOptionProduct {
  children: any
}

export default function MenuOptionProduct(props: IMenuOptionProduct) {

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(false)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" onBlur={() => {
        setTimeout(() => {
          setActive(false)
        }, 100)
      }}>
        <button onClick={() => setActive(!active)} className="flex items-center relative justify-center bg-gray-200 border border-gray-400 rounded-md p-1 pb-2"><i className="flex h-5 w-5">{active ? IconClose : IconOptions}</i></button>
        <div className={`flex flex-col gap-2 pb-1 items-center justify-center absolute ${active ? 'w-24  z-20 border border-gray-400' : 'w-0 z-0'} overflow-hidden top-[-25px] right-8 bg-gray-200  rounded-md transition-all duration-300 ease-in-out`}>{props.children}</div>
      </div>

    </div>
  )
}