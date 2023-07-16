import { toastComponent } from "../toasts/Toast";

// Função responsável por verificar se a diferença na quantidade inserida é valida na hora da venda
export const verifySellAmount = (value: number, amount: number ): boolean => {
  if(amount - value >= 0) {
      const isValid = value.toString().indexOf('.');
    if (value == 0) {
      toastComponent({type: 'error'}, 'Campo de quantidade não pode ser vázio')
      return false
    }
    if (isValid !== -1) {
      toastComponent({type: 'error'}, 'Valor não é inteiro')
      return false
    }
    return true
  } else {
    toastComponent({type: 'error'}, 'Quantidade acima do limite cadastrado')
    return false
  }
}