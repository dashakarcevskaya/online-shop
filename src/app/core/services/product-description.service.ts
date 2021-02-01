import { Injectable } from '@angular/core';

import { ProductType } from '@core/enums/product-type';
import { Product } from '@core/types/product';
import { Phone } from '@core/types/phone';
import { Headphones } from '@core/types/headphones';

import { MappingTextService } from './mapping-text.service';

import { ProductDescription } from '../types/product-description';
import { SmartWatch } from '@core/types/smartwatches';
import { Laptop } from '@core/types/laptop';

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
        return this.mapSmartWatchToDescription(product as SmartWatch);
      case ProductType.Headphones:
        return this.mapHeadphonesToDescription(product as Headphones);
      case ProductType.Laptop:
        return this.mapLaptopToDescription(product as Laptop);
    }
  }

  private mapSmartWatchToDescription(product: SmartWatch): ProductDescription {
    return [
      {
        title: 'General information',
        children: [
          {
            name: 'Market launch date',
            value: product.year
          },
          {
            name: 'Flash Memory',
            value: `${product.flashMemory} GB`
          },
          {
            name: 'Type',
            value: product.typeOfWatch
          },
          {
            name: 'Platform support',
            value: product.support
          }
        ]
      },
      {
        title: 'Screen',
        children: [
          {
            name: 'Screen technology',
            value: product.screenTechnology
          },
          {
            name: 'Screen size',
            value: `${product.screenSize}"`
          },
          {
            name: 'Screen resolution',
            value: `${product.resolution_h}x${product.resolution_w}`
          }
        ]
      },
      {
        title: 'Sensors',
        children: [
          {
            name: 'Pedometer',
            value: product.pedometer ? 'yes' : 'no'
          },
          {
            name: 'Pulsometer',
            value: product.pulsometer ? 'yes' : 'no'
          }
        ]
      },
      {
        title: 'Working hours',
        children: [
          {
            name: 'Working hours',
            value: product.hours
          }
        ]
      }
    ];
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

  private mapLaptopToDescription(product: Laptop): ProductDescription {
    return [
      {
        title: 'General information',
        children: [
          {
            name: 'Market launch date',
            value: product.year
          },
          {
            name: 'Type',
            value: product.laptopType
          },
          {
            name: 'Purpose',
            value: product.purpose
          }
        ]
      },
      {
        title: 'Processor',
        children: [
          {
            name: 'Processor',
            value: product.processor
          },
          {
            name: 'Number of Cores',
            value: product.numberOfCores
          },
          {
            name: 'Clock frequency',
            value: `${product.clockFrequency} MHz`
          }
        ]
      },
      {
        title: 'Screen',
        children: [
          {
            name: 'Screen diagonal',
            value: `${product.screenSize}"`
          },
          {
            name: 'Screen resolution',
            value: `${product.screen_resolution_w}x${product.screen_resolution_h}`
          },
          {
            name: 'Matrix frequency',
            value: `${product.matrixFrequency} Hz`
          }
        ]
      },
      {
        title: 'Data storage',
        children: [
          {
            name: 'Drive configuration',
            value: `SSD ${product.memory} GB`
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
            : []),
          {
            name: 'Design',
            value: product.design
          }
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
