import { toastComponent } from '@/functions/toasts/Toast';
import { authFirebase, providerGoogle } from './../config';
import { NextRouter } from 'next/router';

export function signWithGoogle(setLoading: any, router: NextRouter) {
  setLoading(true)
  authFirebase.signInWithPopup(providerGoogle).then(() => {
    toastComponent({ type: 'success' }, 'Login realizado com sucesso!')
    router.push('/home')
  }).catch(() => {
    setLoading(false)
  })
}