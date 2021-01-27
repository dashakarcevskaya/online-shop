import { Injectable } from '@angular/core';
import { ProductType } from '@core/enums/product-type';
import { HeadphonesPurpose } from '@core/enums/headphones-purpose';
import { Product } from '@core/types/product';
import { Phone } from '@core/types/phone';
import { SmartWatches } from '@core/types/smartwatches';
import { Headphones } from '@core/types/headphones';

@Injectable()
export class ProductShortDescriptionService {
  public mapProductToShortDescription(product: Product): string {
    switch (product.type) {
      case ProductType.Phone:
        return this.mapPhoneToShortDescription(product as Phone);
      case ProductType.SmartWatch:
        return this.mapSmartWatchesToShortDescription(product as SmartWatches);
      case ProductType.Headphones:
        return this.mapHeadphonesToShortDescription(product as Headphones);
    }
  }

  private mapPhoneToShortDescription(product: Phone): string {
    return `${product.brand}, screen ${product.screen.size}" ${product.screen.technology}
      (${product.screen.resolution_w}x${product.screen.resolution_h}), ${product.processor}, memory ${product.memory} GB,
      storage ${product.storage}, camera ${product.main_camera_mp} Mp, accumulator ${product.accumulator} mAh`;
  }

  private mapSmartWatchesToShortDescription(product: SmartWatches): string {
    return `${product.name}`;
  }

  private mapHeadphonesToShortDescription(product: Headphones): string {
    return `${
      product.kind === 'headphones_with_mic'
        ? 'headphones with microphone'
        : 'headphones'
    }, ${this.getHeadphonesPurpose(product.purpose)}
    ${
      product.wireless_interface ? `, ${product.wireless_interface_type} ,` : ''
    } 
    ${product.hours_capacity ? `run time ${product.hours_capacity} h.` : ''}`;
  }

  private getHeadphonesPurpose(purpose: string): string {
    switch (purpose) {
      case HeadphonesPurpose.Portable:
        return 'portable';
      case HeadphonesPurpose.Gaming:
        return 'gaming';
      case HeadphonesPurpose.Sport:
        return 'sport';
    }
  }
}
