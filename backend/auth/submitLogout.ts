import { NextRouter } from "next/router";
import { authFirebase } from "../config";

export function submitLogout(router: NextRouter, loading: (value: boolean) => void) {
  loading(true)
  authFirebase.signOut()
  router.push('/')
  loading(false)
}