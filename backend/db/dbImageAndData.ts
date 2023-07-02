import { dbFirebase } from "../config";

export function dbImageAndData(image: string, dataUid: any) {
  const data = {
    imgUrl: image
  }
  dbFirebase.doc(dataUid).collection('ImageUser').add(data)
}