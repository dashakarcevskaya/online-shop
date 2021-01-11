import { ProductType } from '../enums/product-type';

export type Product = {
  type: ProductType;
  id: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  year: number;
  images: string[];
};
