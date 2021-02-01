import { Product } from './product';

export type SmartWatch = Product & {
  support: string;
  typeOfWatch: string;
  screenTechnology: string;
  flashMemory: number;
  hours: number;
  pedometer: boolean;
  pulsometer: boolean;
  resolution_h: number;
  resolution_w: number;
  screenSize: number;
};
