// Função responsávle por verificar o checkbox e inserir um cookie no navegador do usuário
export function verifyCheckBox(value: boolean) {
  if (value === true) {
    localStorage.setItem('rememberMyAccontMyCommerce', 'true')
  } else {
    localStorage.setItem('rememberMyAccontMyCommerce', 'false')
  }
}