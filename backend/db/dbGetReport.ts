import { ReportType } from '@/types/reportType';
import { authFirebase, dbFirebase } from "../config"

// Função responsável por realizar consultas na tabela de relátorio
export const dbGetReport = ( value: string): Promise<{ name: string, data: ReportType[], user: string, date: string, uid: string }[]> => {
  return new Promise((resolve, reject) => {
    let list: any[] = []
    let valueLower = value.toLocaleLowerCase()
    authFirebase.onAuthStateChanged((user) => {
      if (user) {
        dbFirebase.doc(user.uid).collection('Report')
        .orderBy('name')
        .startAt(valueLower).endAt(valueLower + '\uf8ff')
        .get()
        .then((products) => {
          list = products.docs.map((product) => ({
            name: product.data().name,
            user: product.data().user,
            data: product.data().data,
            date: product.data().date,
            uid: product.id
          }))

          list.sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)

            return dateA.getTime() - dateB.getTime()
          });

          resolve(list)
        }, (error) => {
          reject(error)
        })
      } else {
        window.location.href = '/'
      }
    })
  })
}