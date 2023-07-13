import Image from "next/image";
import { useEffect, useState } from "react";
import { dbImagePerfil, dbNamePerfil } from "../../../../backend/db/dbImagePerfil";
import { useRouter } from "next/router";
import { useMenuProfile } from "@/store/reducers/menuProfileReducers/useMenuProfile";
import { IconArrowDown, IconArrowLeft, IconEditLogin, IconLogOut } from "../../../../public/icons/icons";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import { submitLogout } from "../../../../backend/auth/submitLogout";
import Link from "next/link";
import { authFirebase } from "../../../../backend/config";

export default function NavProfile() {
  const { setLoading } = useLoadingReducer()
  const { activate, setMenu } = useMenuProfile()
  const router = useRouter()
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserImage = async () => {
      authFirebase.onAuthStateChanged(async (user) => {
        setLoading(true);
        if(user) {
          try {
            const name = await dbNamePerfil()
            const url = await dbImagePerfil()
            if (typeof url === 'string' && typeof name === 'string') {
              setUserImage(url)
              setUserName(name)
            }
            setMenu(false)
            setLoading(false)
          } catch(erro) {
            router.push('/')
          }
        } else {
          router.push('/')
        }
      })
    }
    fetchUserImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex items-center justify-between w-full h-full bg-gray-300">
      <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={160} height={140} priority={true} className="h-12 pl-2 w-auto" />
      <div className="flex items-center justify-end w-1/2 h-full gap-1 pr-2 cursor-pointer bg-gray-400" onClick={() => setMenu(!activate)}>
        <h2>{userName}</h2>
        <div className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border border-gray-200 bg-white">
          <Image src={userImage ? userImage : '/userUnknown.jpg'} alt="FotoDePerfil" width={160} height={140} priority={true} className="h-auto w-auto" />
        </div>
        <i className="flex items-center h-4 w-4">{activate ? IconArrowDown : IconArrowLeft}</i>
      </div>
      <div className={`absolute w-1/2 bg-gray-400 right-0 top-14 overflow-hidden transition-all duration-300 ease-in-out ${activate ? 'flex flex-col items-center h-24 z-20' : 'h-0'}`}>
        <Link href={'/dataMainUser'} className="flex items-center justify-center w-full h-1/2 gap-1">
          <span>Dados do usuário</span>
          <i>{IconEditLogin}</i>
        </Link>
        <hr className="w-4/5 border-gray-200" />
        <div className="flex items-center justify-center w-full h-1/2 gap-1 cursor-pointer" onClick={() => submitLogout(setLoading)}>
          <span>Sair</span>
          <i>{IconLogOut}</i>
        </div>
      </div>
    </div>
  )
}