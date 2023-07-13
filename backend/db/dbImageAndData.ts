import { dbFirebase } from "../config";

export function dbImageAndData(image: string, dataUid: any) {
  const data = {
    imgUrl: image
  }
  dbFirebase.doc(dataUid).collection('ImageUser').add(data)
}

export function dbUpdateImageAndData(image: string, dataUid: any) {
  const data = {
    imgUrl: image
  }
  dbFirebase.doc(dataUid).collection('ImageUser').get().then((dataImage) => {
    dataImage.docs.map((image) => {
      dbFirebase.doc(dataUid).collection('ImageUser').doc(image.id).delete().then(() => {
        dbFirebase.doc(dataUid).collection('ImageUser').add(data)
      })
    })
  })
}