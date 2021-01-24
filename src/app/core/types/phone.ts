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

// export const brands: string[] = [
//   'Apple',
//   'HONOR',
//   'Nokia',
//   'Sony',
//   'POCO',
//   'Xiaomi',
//   'Huawei',
//   'Lenovo',
//   'Apple',
//   'Samsung',
//   'Nubia'
// ].sort();

// export const years: number[] = [2020, 2019, 2018, 2017, 2016];

export const operatingSystem: string[] = ['Android', 'Apple iOS'];

// export const screenSize: string[] = [
//   '6" и менее',
//   '6.1-6.3"',
//   '6.4-6.5"',
//   '6.6-6.7"',
//   'более 6.7"'
// ];
// export const screenResolution: string[] = [
//   '720x1280 (HD) и менее',
//   '1080x1920 (FullHD)',
//   '1440x2560 (QHD) и более'
// ];

// export const screenTechnology: string[] = ['IPS', 'AMOLED', 'OLED', 'TFT'];

export const screenFrequency: number[] = [60, 90, 120, 144];

export const memory: number[] = [2, 3, 4, 6, 8, 12];
