export function verifyCheckBox(value: boolean) {
  if (value === true) {
    localStorage.setItem('rememberMyAccontMyCommerce', 'true')
  } else {
    localStorage.setItem('rememberMyAccontMyCommerce', 'false')
  }
}