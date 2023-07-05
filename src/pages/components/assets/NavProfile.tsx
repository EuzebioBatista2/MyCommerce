import Image from "next/image";
import { useEffect, useState } from "react";
import { dbImagePerfil, dbNamePerfil } from "../../../../backend/db/dbImagePerfil";
import { useRouter } from "next/router";
import { useMenuProfile } from "@/store/reducers/menuProfileReducers/useMenuProfile";
import { IconArrowDown, IconArrowLeft, IconEditLogin, IconLogOut } from "../../../../public/icons/icons";
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer";
import { submitLogout } from "../../../../backend/auth/submitLogout";

export default function NavProfile() {
  const { setLoading } = useLoadingReducer()
  const { activate, setMenu } = useMenuProfile()
  const router = useRouter()
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        setMenu(false)
        const name = await dbNamePerfil()
        const url = await dbImagePerfil()
        if (typeof url === 'string' && typeof name === 'string') {
          setUserImage(url)
          setUserName(name)
        }
      } catch(erro) {
        router.push('/')
      }
    }
    
    setLoading(true);
    fetchUserImage().finally(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex items-center justify-between w-full h-full bg-gray-300">
      <Image src="/ProjectPhotoLogo.png" alt="LogoMarca" width={160} height={140} priority={true} className="h-12 pl-2 w-auto" />
      <div className="flex items-center justify-end w-1/2 h-full gap-1 pr-2 cursor-pointer bg-gray-400" onClick={() => setMenu(!activate)}>
        <h2>{userName}</h2>
        <div className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden">
          <Image src={userImage ? userImage : '/userUnknown.jpg'} alt="FotoDePerfil" width={160} height={140} priority={false} className="h-full w-full" />
        </div>
        <i className="flex items-center h-4 w-4">{activate ? IconArrowDown : IconArrowLeft}</i>
      </div>
      <div className={`absolute w-1/2 bg-gray-400 right-0 top-14 overflow-hidden transition-all duration-300 ease-in-out ${activate ? 'flex flex-col items-center h-24' : 'h-0'}`}>
        <div className="flex items-center justify-center w-full h-1/2 gap-1">
          <span>Dados do usuário</span>
          <i>{IconEditLogin}</i>
        </div>
        <hr className="w-4/5 border-gray-200" />
        <div className="flex items-center justify-center w-full h-1/2 gap-1 cursor-pointer" onClick={() => submitLogout(router, setLoading)}>
          <span>Sair</span>
          <i>{IconLogOut}</i>
        </div>
      </div>
    </div>
  )
}