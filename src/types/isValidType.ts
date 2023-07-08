export interface IIsValidAuthType {
  isNameValid?: boolean
  isEmailValid: boolean
  isPasswordValid?: boolean
  isImageValid?: boolean
}

export interface IIsValidProductType {
  isNameValid: boolean
  isAmountValid: boolean
  isPriceValid: boolean
}

export interface IIsValidCreateUser {
  isNameValid: boolean
  isPhoneValid: boolean
}