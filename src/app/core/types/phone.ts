import { Product } from './product';

export type Phone = Product & {
  accumulator: number;
  front_camera_mp: number;
  main_camera_mp: number;
  memory: number;
  operating_system: string;
  processor: string;
  screen: {
    frequency: number;
    resolution_h: number;
    resolution_w: number;
    size: number;
    technology: string;
  };
  storage: number;
};
