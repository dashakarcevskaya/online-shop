import { ProductType } from '@core/enums/product-type';

export type Filter = {
  name: string;
  productType: ProductType;
  field: string;
  options: Array<{ name: string | number; value: string | number }>;
};
