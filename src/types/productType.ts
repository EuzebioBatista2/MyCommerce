export interface ProductType {
  name: string;
  amount: number;
  price: number;
}

export interface FinalProductType {
  name: string;
  data: ProductType;
}