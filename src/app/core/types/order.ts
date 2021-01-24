export type Order = {
  number: number;
  userId: string;
  date: string;
  time: string;
  city: string;
  street: string;
  house: number;
  apartment: number | null;
  paymentMethod: string;
  mobilePhone: string;
  comment: string;
  products: Array<{
    id: string;
    price: number;
    name: string;
    quantity: number;
    type: string;
    images: string;
  }>;
  orderPrice: number;
};
