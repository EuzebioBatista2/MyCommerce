import { authFirebase } from "../config";

// Função responsável por realizar o logout
export  function submitLogout(loading: (value: boolean) => void) {
  loading(true)
  authFirebase.onAuthStateChanged(() => {
    authFirebase.signOut()
    .then(() => {
      window.location.href = '/'
      loading(false);
    })
  });
}