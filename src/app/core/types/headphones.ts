import { HeadphonesPurpose } from '../enums/headphones-purpose';
import { HeadphonesKind } from '../enums/headphones-kind';

import { Product } from './product';
import { from } from 'rxjs';

export type Headphones = Product & {
  kind: HeadphonesKind;
  purpose: HeadphonesPurpose;
  wireless_interface: boolean;
  wireless_interface_type: string;
  hours_capacity: number;
};
