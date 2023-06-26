import { toastComponent } from "../toasts/Toast";

export const verifyEmail = (emailInput: HTMLInputElement | null): boolean => {
  if (emailInput && emailInput.value.match(/[\w\.\+]+@[\w]+\.[\w]+(\.[\w]+)?/g)) {
    emailInput.className = `${emailInput.className.replace('text-red-500 border-red-500', '')}`;
    return true
  } else if (emailInput) {
    emailInput.className += ' text-red-500 border-red-500';
    toastComponent({type: 'error'}, 'Erro no campo Email!')
  }
  return false
};