import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import Image from "next/image";

export default function Loading() {
  const { loading } = useLoadingReducer()
  console.log(loading)
  return (
    <div className={`${loading ? 'flex z-10' : 'hidden z-0'}w-screen h-screen items-center justify-center absolute bg-gray-100`}>
      <Image src="/loading.gif" alt="Carregando" width={160} height={140} className={`border-transparent`} /> 
    </div>
  )
} 