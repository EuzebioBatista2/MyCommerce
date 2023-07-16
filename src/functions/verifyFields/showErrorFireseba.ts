// Função responsável por verificar erros do firebase
export function showErrorFirebase(error: any) {
  switch (error.code) {
    case 'auth/invalid-email':
    case 'auth/user-not-found':
      break;
    default:
      break;
  }
}