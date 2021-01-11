import { Primitive } from '@angular/fire/database/interfaces';
import { Product } from './product';

export type Tv = Product & {
  screen: {
    frequency: number;
    resolution_h: number;
    resolution_w: number;
    size: number;
    technology: string;
  };
};
