export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
  internalSku: string;
}
export type PublicProduct = Omit<Product, "internalSku">;

export interface ProductFormState {
  name: string;
  price: string; 
}

export type ProductDraft = Partial<ProductFormState>;

export interface ProductFormErrors {
  name?: string;
  price?: string;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoFilter = "all" | "active" | "completed";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string };
  address: { street: string; suite: string; city: string; zipcode: string };
}
export interface ShopItem {
  id: number;
  name: string;
  price: number;
}

export interface AuthUser {
  email: string;
}