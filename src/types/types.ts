export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
}

export interface ProductFormState {
  name: string;
  price: string;
}

export interface ProductFormErrors {
  name?: string;
  price?: string;
}