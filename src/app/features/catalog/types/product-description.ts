export type ProductDescription = {
  title: string;
  children: {
    name: string;
    value: string | number;
  }[];
}[];
