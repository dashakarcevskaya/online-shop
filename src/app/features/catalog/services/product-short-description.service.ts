import { Injectable } from '@angular/core';
import { ProductType } from '@core/enums/product-type';
import { HeadphonesPurpose } from '@core/enums/headphones-purpose';
import { Product } from '@core/types/product';
import { Phone } from '@core/types/phone';
import { Headphones } from '@core/types/headphones';

@Injectable()
export class ProductShortDescriptionService {
  public mapProductToShortDescription(product: Product): string {
    switch (product.type) {
      case ProductType.Phone:
        return this.mapPhoneToShortDescription(product as Phone);
      case ProductType.Tv:
        return;
      case ProductType.SmartWatch:
        return;
      case ProductType.Headphones:
        return this.mapHeadphonesToShortDescription(product as Headphones);
    }
  }

  private mapPhoneToShortDescription(product: Phone): string {
    return `${product.brand}, экран ${product.screen.size}" ${product.screen.technology}
      (${product.screen.resolution_w}x${product.screen.resolution_h}), ${product.processor}, ОЗУ ${product.memory} ГБ,
      флеш-память ${product.storage}, камера ${product.main_camera_mp} Мп, аккумулятор ${product.accumulator} мАч`;
  }

  private mapHeadphonesToShortDescription(product: Headphones): string {
    return `${
      product.kind === 'headphones_with_mic'
        ? 'наушники с микрофоном'
        : 'наушники'
    }, ${this.getHeadphonesPurpose(product.purpose)}
    ${
      product.wireless_interface ? `, ${product.wireless_interface_type} ,` : ''
    } 
    ${
      product.hours_capacity ? `время работы ${product.hours_capacity} ч.` : ''
    }`;
  }

  private getHeadphonesPurpose(purpose: string): string {
    switch (purpose) {
      case HeadphonesPurpose.Portable:
        return 'портативные';
      case HeadphonesPurpose.Gaming:
        return 'геймерские';
      case HeadphonesPurpose.Sport:
        return 'спортивные';
    }
  }
}
