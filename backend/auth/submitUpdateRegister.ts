import { authFirebase, storageFirebase } from '../config';


export function submitUpdateRegister(event: React.FormEvent<HTMLFormElement>, data: { userName: string, userImageSub: any }): Promise<void> {
  return new Promise(async (resolve, reject) => {
    event.preventDefault();
    const inputName = data.userName ? data.userName : '';
    let image: any;
    if (data.userImageSub) {
      image = data.userImageSub ? data.userImageSub : '';
    } else {
      image = "emptyImage";
    }

    const user = authFirebase.currentUser;
    
    if (user && user.uid) {
      if (image === "emptyImage") {
        user.updateProfile({
          displayName: inputName,
        }).then(() => {
          resolve();
        });
      } else {
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
