import { Injectable } from '@angular/core';

import { ProductType } from '@core/enums/product-type';
import { Product } from '@core/types/product';
import { Phone } from '@core/types/phone';
import { Headphones } from '@core/types/headphones';

import { MappingTextService } from './mapping-text.service';

import { ProductDescription } from '../types/product-description';

@Injectable({
  providedIn: 'root'
})
export class ProductDescriptionService {
  constructor(private mappingService: MappingTextService) {}

  public mapProductToDescription(product: Product): ProductDescription {
    switch (product.type) {
      case ProductType.Phone:
        return this.mapPhoneToDescription(product as Phone);
      case ProductType.SmartWatch:
        return;
      case ProductType.Headphones:
        return this.mapHeadphonesToDescription(product as Headphones);
    }
  }

  private mapPhoneToDescription(product: Phone): ProductDescription {
    return [
      {
        title: 'General information',
        children: [
          {
            name: 'Market launch date',
            value: product.year
          }
        ]
      },
      {
        title: 'Main',
        children: [
          {
            name: 'Operating system',
            value: product.operating_system
          },
          {
            name: 'Memory',
            value: product.memory
          },
          {
            name: 'Storage',
            value: product.storage
          }
        ]
      },
      {
        title: 'Camera',
        children: [
          {
            name: 'Main camera',
            value: product.main_camera_mp
          },
          {
            name: 'Front-camera',
            value: product.front_camera_mp
          }
        ]
      },
      {
        title: 'Processor',
        children: [
          {
            name: 'Processor',
            value: product.processor
          }
        ]
      },
      {
        title: 'Screen',
        children: [
          {
            name: 'Screen size',
            value: product.screen.size
          },
          {
            name: 'Screen resolution',
            value: `${product.screen.resolution_w}x${product.screen.resolution_h}`
          },
          {
            name: 'Screen technology',
            value: product.screen.technology
          }
        ]
      },
      {
        title: 'Battery and run time',
        children: [
          {
            name: 'Battery capacity',
            value: `${product.accumulator} мА·ч`
          }
        ]
      }
    ];
  }

  private mapHeadphonesToDescription(product: Headphones): ProductDescription {
    return [
      {
        title: 'General information',
        children: [
          {
            name: 'Purpose',
            value: `${this.mappingService.mapHeadphonesPurpose(
              product.purpose
            )}`
          },
          { name: 'Market launch date', value: `${product.year}` }
        ]
      },
      {
        title: 'Main',
        children: [
          {
            name: 'Kind',
            value: `${this.mappingService.mapHeadphonesKind(product.kind)}`
          },
          {
            name: 'Wireless interface',
            value: `${product.wireless_interface ? 'yes' : 'no'}`
          },
          ...(product.wireless_interface_type
            ? [
                {
                  name: 'Wireless interface type',
                  value: `${product.wireless_interface_type}`
                }
              ]
            : [])
        ]
      },
      ...(product.hours_capacity
        ? [
            {
              title: 'Run time',
              children: [
                {
                  name: 'Maximum run time',
                  value: `${product.hours_capacity}`
                }
              ]
            }
          ]
        : [])
    ];
  }
}
