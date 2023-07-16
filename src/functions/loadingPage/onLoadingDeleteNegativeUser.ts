import { authFirebase, dbFirebase } from "../../../backend/config"
import { toastComponent } from "../toasts/Toast"
import { formatDate } from "../verifyFields/verifyDate"

// Função responsável por carregar o loading enquanto o usuário em dívida é removido da lista
export function onLoadingDeleteNegativeUser(loading: any, uidUser: string, uidCart: string): Promise<void> {
  return new Promise((resolve) => {
    let list: { amount: number; price: number; name: string }[] = [];
    let userName: string = "";
    loading(true);

    authFirebase.onAuthStateChanged((user) => {
      // Realiza uma consulta especifica pegando o nome do usuário no qual será excluído
      dbFirebase.doc(user?.uid).collection("ListUsers").doc(uidUser).get()
        .then((user) => {
          userName = user.data()?.data.name;
        })
        .then(() => {
          // Realiza uma consulta especifica pegando os produtos cadastrados dentro do carrinho especifico do usuário em dívida
          dbFirebase.doc(user?.uid).collection("ListUsersProducts").doc(uidCart).collection("Products").get()
            .then((products) => {
              list = products.docs.map((product) => ({
                amount: product.data().data.amount,
                price: product.data().data.price,
                name: product.data().data.name,
              }));
              return list;
            })
            .then((list) => {
              // Realiza a insersão desses dados consultados na tabela de relátorio
              dbFirebase.doc(user?.uid).collection("Report")
                .add({
                  user: userName,
                  data: list,
                  name: userName.toLocaleLowerCase(),
                  date: formatDate(new Date()),
                })
                .then(() => {
                  // Realiza novamente uma consulta na tabela do carrinho do usuário em dívida e exclui todos os produtos dentro.
                  dbFirebase.doc(user?.uid).collection("ListUsersProducts").doc(uidCart).collection("Products").get()
                    .then((products) => {
                      products.docs.map((product) => {
                        dbFirebase.doc(user?.uid).collection("ListUsersProducts").doc(uidCart).collection("Products").doc(product.id)
                          .delete();
                      });
                    })
                    .then(() => {
                      // Realiza a mesma consulta, porém exclui a tabela vazia do carrinho do usuário em dívida
                      dbFirebase.doc(user?.uid).collection("ListUsersProducts").doc(uidCart).delete();
                    })
                    .then(() => {
                      // Realiza novamente a consulta especifica nos dados usuário em dívida e retira seus dados
                      dbFirebase.doc(user?.uid).collection("ListUsers").doc(uidUser).delete();
                    })
                    .then(() => {
                      toastComponent({ type: "success" }, `Produtos vendidos com sucesso!`);
                      loading(false);
                      resolve();
                    });
                });
            });
        });
    });
  });
}