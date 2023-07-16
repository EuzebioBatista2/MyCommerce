import { FinalProductType, ProductType } from "@/types/productType";
import { authFirebase, dbFirebase } from "../config";

// Função responsável por verificar se existe um produto repetido e inserir na tabela
export function submitProduct (data: ProductType, event?: React.FormEvent<HTMLFormElement>): Promise<void> {
  return new Promise((resolve, reject) => {
    event?.preventDefault()
    let repeat: boolean = false
    const dataNew: FinalProductType = {
      name: data.name.toLocaleLowerCase(),
      data: data
    }
    authFirebase.onAuthStateChanged(async (user) => {
      // Consulta e verificação se já existe um produto cadastrado com o mesmo preço
      await dbFirebase.doc(user?.uid).collection('Products').get().then((values) => {
        values.docs.map((value) => {
          if(value.data().name === data.name.toLocaleLowerCase() && value.data().data.price === data.price) {
            repeat = true
          }
        })
      })
      // Caso não exista, permite a criação do produto
      if(repeat === false) {
        dbFirebase.doc(authFirebase.currentUser?.uid).collection('Products').add(dataNew).then(() => {
          resolve()
        })
      }
      // Caso já exista, será negado o cadastro
      else {
        reject()
      }
    })
  })
}