export interface UserType {
  email: string;
  password: string;
}

export interface UserNegative {
  name: string;
  phone: string;
}

export interface UserData {
  name: string
  data: UserNegative
}