export interface ProductType {
  name: string;
  amount: number;
  price: number;
}

export interface ProductStateType {
  data: ProductType[];
  user: string;
}

export interface FinalProductType {
  name: string;
  data: ProductType;
}

export interface ProductTypeState {
  productFinal: FinalProductType;
  uid: string;
}
