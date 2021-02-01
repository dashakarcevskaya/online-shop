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
        return `s.${capitalize(value?.city)}, st.${capitalize(
          value?.street
        )}, h.${value?.house}`;
      } else {
        return `s.${capitalize(value?.city)}, st.${capitalize(
          value?.street
        )}, h.${value?.house}, ap.${value?.apartment}`;
      }
    }
  }
}
