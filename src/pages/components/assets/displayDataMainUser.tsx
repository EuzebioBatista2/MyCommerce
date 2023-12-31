import { useEffect, useState } from "react"
import Input from "./Input"
import { useRouter } from "next/router"
import { useLoadingReducer } from "@/store/reducers/loadingReducers/useLoadingReducer"
import Button from "./Button"
import { dbImagePerfil, dbNamePerfil } from "../../../../backend/db/dbImagePerfil"
import Image from "next/image"
import { onLoadingUpdateRegister } from "@/functions/loadingPage/onLoadingUpdateRegister"
import { verifyImage } from "@/functions/verifyFields/verifyImage"


export default function DisplayDataMainUser() {

  const [userName, setUserName] = useState<string>('')
  const [userImage, setUserImage] = useState('');
  const [userImageSub, setUserImageSub] = useState<any>('');
  const [previewImage, setPreviewImage] = useState<any>('');


  const { setLoading } = useLoadingReducer()
  const router = useRouter()

  const [styleInputName, setStyleInputName] = useState<boolean>(true)
  const [styleInputImage, setStyleInputImage] = useState<boolean>(true)

  useEffect(() => {
    // Função responsável por carregar os dados de nome de imagem
    const fetchUserImage = async () => {
      try {
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
    fetchUserImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Exibe a imagem nos display onde pode substituir a imagem atual
    if (userImageSub && userImageSub[0]) {
      const reader = new FileReader();
      let IsValid: boolean = verifyImage(userImageSub[0])
      if (IsValid) {
        reader.readAsDataURL(userImageSub[0]);
        reader.onload = () => {
          setPreviewImage(reader.result);
        };
      } else {
        setPreviewImage('/userUnknown.jpg')
        setUserImage('')
      }
    }
  }, [userImageSub])

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex items-center justify-center h-32 w-32 rounded-full overflow-hidden">
        <Image src={previewImage ? previewImage : userImage ? userImage : '/userUnknown.jpg' } alt="FotoDePerfil" width={160} height={140} priority={true} className="h-auto w-auto" />
      </div>
      <form action="" className="flex flex-col items-center justify-center w-full" 
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        onLoadingUpdateRegister(setLoading, event, router, {userName, userImageSub })
        .then((isValid) => {
          setStyleInputName(!!isValid.isNameValid)
          setStyleInputImage(!!isValid.isImageValid)
        })
      }}>
        <Input type="file" text="Imagem de perfil" id="imagemProfile" inputError={styleInputImage} userImage
          onChange={(event) => { setUserImageSub(event.target.files), setStyleInputImage(true) }} 
        />
        <Input type="text" text="Name" id="name" inputError={styleInputName} value={userName}
          onChange={(event) => { setUserName(event.target.value), setStyleInputName(true) }}
        />

        <Button color="blue" text="Atualizar" submit />
      </form>
    </div>
  )
}