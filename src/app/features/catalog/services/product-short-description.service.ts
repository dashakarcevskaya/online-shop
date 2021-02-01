import { Injectable } from '@angular/core';
import { ProductType } from '@core/enums/product-type';
import { HeadphonesPurpose } from '@core/enums/headphones-purpose';
import { Product } from '@core/types/product';
import { Phone } from '@core/types/phone';
import { SmartWatch } from '@core/types/smartwatches';
import { Headphones } from '@core/types/headphones';
import { Laptop } from '@core/types/laptop';

@Injectable()
export class ProductShortDescriptionService {
  public mapProductToShortDescription(product: Product): string {
    switch (product.type) {
      case ProductType.Phone:
        return this.mapPhoneToShortDescription(product as Phone);
      case ProductType.SmartWatch:
        return this.mapSmartWatchesToShortDescription(product as SmartWatch);
      case ProductType.Headphones:
        return this.mapHeadphonesToShortDescription(product as Headphones);
      case ProductType.Laptop:
        return this.mapLaptopToShortDescription(product as Laptop);
    }
  }

  private mapLaptopToShortDescription(product: Laptop): string {
    return `${product.screenSize}" ${product.screen_resolution_w} x ${product.screen_resolution_h} ${product.screenTechnology},
     ${product.processor} ${product.clockFrequency} MHz, SSD ${product.memory} GB`;
  }

  private mapPhoneToShortDescription(product: Phone): string {
    return `${product.brand}, screen ${product.screen.size}" ${product.screen.technology}
      (${product.screen.resolution_w}x${product.screen.resolution_h}), ${product.processor}, memory ${product.memory} GB,
      storage ${product.storage}, camera ${product.main_camera_mp} Mp, accumulator ${product.accumulator} mAh`;
  }

  private mapSmartWatchesToShortDescription(product: SmartWatch): string {
    return `${product.typeOfWatch}, support ${product.support}, screen ${product.screenTechnology} ${product.screenSize}"
     (${product.resolution_h}x${product.resolution_w}), working hours: ${product.hours} h`;
  }

  private mapHeadphonesToShortDescription(product: Headphones): string {
    return `${
      product.kind === 'headphones_with_mic'
        ? 'headphones with microphone'
        : 'headphones'
    }, ${product.design}, ${this.getHeadphonesPurpose(product.purpose)},

    ${
      product.wireless_interface ? ` ${product.wireless_interface_type} ,` : ''
    } ${product.frequencyRange ? `${product.frequencyRange} Hz, ` : ''}
    ${product.hours_capacity ? `run time ${product.hours_capacity} h.` : ''} ${
      product.cable ? `cable ${product.cable} m` : ''
    }
     `;
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
