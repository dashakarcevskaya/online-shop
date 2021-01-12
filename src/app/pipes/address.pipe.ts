import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@core/types/user';
@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {
  transform(value: User): any {
    if (value?.sity === '') {
      return '--';
    } else {
      if (value?.apartment === null) {
        return `г.${value?.sity}, ул.${value?.street}, д.${value?.house}`;
      } else {
        return `г.${value?.sity}, ул.${value?.street}, д.${value?.house}, кв.${value?.apartment}`;
      }
    }
  }
}
