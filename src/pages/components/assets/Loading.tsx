import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loading() {
  const { loading } = useLoadingReducer()
  const [activate, setActivate] = useState<boolean>(loading)

  useEffect(() => {
    setActivate(loading)
  }, [loading])
  return (
    <div className={`${activate ? 'flex z-20' : 'hidden z-0'} w-screen h-screen items-center justify-center absolute bg-gray-100 transtion duration-500 ease-in-out`}>
      <Image src="/loading.gif" alt="Carregando" width={160} height={140} className={`border-transparent`} priority={true} style={{ height: "auto", width: "auto" }} /> 
    </div>
  )
} 