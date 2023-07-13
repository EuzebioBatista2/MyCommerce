import { NextRouter } from "next/router";
import { authFirebase } from "../config";

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