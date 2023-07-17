import { toastComponent } from "../toasts/Toast";

// Função responsável por verificar erros do firebase
export function showErrorFirebase(error: any) {
  switch (error.code) {
    case 'auth/invalid-email':
    case 'auth/user-not-found':
      break;
    case 'auth/email-already-in-use':
      toastComponent({ type: 'warning' }, 'Conta já existe!')
      break;
    default:
      break;
  }
}