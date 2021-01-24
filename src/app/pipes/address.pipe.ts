import { Pipe, PipeTransform } from '@angular/core';
import { UserAddress } from '@core/types/userAddress';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {
  transform(value: UserAddress): any {
    const capitalize = (str: string) => {
      if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }
      return str;
    };

    if (value?.city === '') {
      return '--';
    } else {
      if (value?.apartment === null) {
        return `г.${capitalize(value?.city)}, ул.${capitalize(
          value?.street
        )}, д.${value?.house}`;
      } else {
        return `г.${capitalize(value?.city)}, ул.${capitalize(
          value?.street
        )}, д.${value?.house}, кв.${value?.apartment}`;
      }
    }
  }
}
