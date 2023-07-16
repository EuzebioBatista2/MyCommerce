import { authFirebase, storageFirebase } from '../config';

// Função responsável por realizar atualização nos dados cadastrais do usuário logado
export function submitUpdateRegister(event: React.FormEvent<HTMLFormElement>, data: { userName: string, userImageSub: any }): Promise<void> {
  return new Promise(async (resolve, reject) => {
    event.preventDefault();
    // Verificando se foi enviado uma nova imagem através do formulário
    const inputName = data.userName ? data.userName : '';
    let image: any;
    if (data.userImageSub) {
      image = data.userImageSub ? data.userImageSub : '';
    } else {
      image = "emptyImage";
    }

    const user = authFirebase.currentUser;
    
    if (user && user.uid) {
      // Aplicando alteração apenas no nome
      if (image === "emptyImage") {
        user.updateProfile({
          displayName: inputName,
        }).then(() => {
          resolve();
        });
      } else {
        // Verificando se há uma imagem existente configurada na URL de armazenamento
        storageFirebase.ref(`myCommerceFiles/${user.uid}/mainImage/`).listAll()
        .then((result) => {
          let nameFile: string = '';
          if (result.items.length > 0) {
            result.items.forEach((item) => {
              nameFile = item.name;
            });
          } else {
            nameFile = 'noImage';
          }
          // Em caso de não existir, realizar apenas a inserção da imagem e atualizar o nome
          if (nameFile === 'noImage') {
            let imageUrl: any;
            const urlImage = storageFirebase.ref(`myCommerceFiles/${user.uid}/mainImage/${image[0].name}`);
            if (image[0].name !== '') {
              const upload = urlImage.put(image[0]);
              upload.on('state_changed', () => { }, () => { }, () => {
                urlImage.getDownloadURL().then((downloadURL) => {
                  imageUrl = downloadURL;
                  user.updateProfile({
                    displayName: inputName,
                    photoURL: imageUrl
                  }).then(() => {
                    resolve();
                  });
                });
              });
            }
          // Caso exista a imagem, realizar o delete e depois inserir a nova imagem com o nome atualizado
          } else {
            const storageRef = storageFirebase.ref(`myCommerceFiles/${user.uid}/mainImage/${nameFile}`);
            storageRef.delete().then(() => {
              let imageUrl: any;
              const urlImage = storageFirebase.ref(`myCommerceFiles/${user.uid}/mainImage/${image[0].name}`);
              if (image[0].name !== '') {
                const upload = urlImage.put(image[0]);
                upload.on('state_changed', () => { }, () => { }, () => {
                  urlImage.getDownloadURL().then((downloadURL) => {
                    imageUrl = downloadURL;
                    user.updateProfile({
                      displayName: inputName,
                      photoURL: imageUrl
                    }).then(() => {
                      resolve();
                    });
                  });
                });
              }
            });
          }
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
      }
    } else {
      resolve();
    }
  });
}
