import { Product } from './product';

export type Laptop = Product & {
  laptopType: string;
  purpose: string;
  processor: string;
  numberOfCores: number;
  clockFrequency: number;
  screenSize: number;
  screen_resolution_h: number;
  screen_resolution_w: number;
  matrixFrequency: number;
  screenTechnology: string;
  memory: number;
};
