export type ProductDescription = Array<{
  title: string;
  children: Array<{
    name: string;
    value: string | number;
  }>;
}>;
