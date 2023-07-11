import { resolve } from "path"
import { authFirebase, dbFirebase } from "../../../backend/config"
import { toastComponent } from "../toasts/Toast"
import { formatDate } from "../verifyFields/verifyDate"

export function onLoadingDeleteNegativeUser(loading: any, uidUser: string, uidCart: string): Promise<void> {
  return new Promise((resolve) => {
    let list: { amount: number; price: number; name: string }[] = [];
    let userName: string = "";
    loading(true);

    authFirebase.onAuthStateChanged((user) => {
      dbFirebase
        .doc(user?.uid)
        .collection("ListUsers")
        .doc(uidUser)
        .get()
        .then((user) => {
          userName = user.data()?.data.name;
        })
        .then(() => {
          dbFirebase
            .doc(user?.uid)
            .collection("ListUsersProducts")
            .doc(uidCart)
            .collection("Products")
            .get()
            .then((products) => {
              list = products.docs.map((product) => ({
                amount: product.data().data.amount,
                price: product.data().data.price,
                name: product.data().data.name,
              }));
              return list;
            })
            .then((list) => {
              dbFirebase
                .doc(user?.uid)
                .collection("Report")
                .add({
                  user: userName,
                  data: list,
                  name: userName.toLocaleLowerCase(),
                  date: formatDate(new Date()),
                })
                .then(() => {
                  dbFirebase
                    .doc(user?.uid)
                    .collection("ListUsersProducts")
                    .doc(uidCart)
                    .collection("Products")
                    .get()
                    .then((products) => {
                      products.docs.map((product) => {
                        dbFirebase
                          .doc(user?.uid)
                          .collection("ListUsersProducts")
                          .doc(uidCart)
                          .collection("Products")
                          .doc(product.id)
                          .delete();
                      });
                    })
                    .then(() => {
                      dbFirebase
                        .doc(user?.uid)
                        .collection("ListUsersProducts")
                        .doc(uidCart)
                        .delete();
                    })
                    .then(() => {
                      dbFirebase
                        .doc(user?.uid)
                        .collection("ListUsers")
                        .doc(uidUser)
                        .delete();
                    })
                    .then(() => {
                      toastComponent(
                        { type: "success" },
                        `Produtos vendidos com sucesso!`
                      );
                      loading(false);
                      resolve();
                    });
                });
            });
        });
    });
  });
}