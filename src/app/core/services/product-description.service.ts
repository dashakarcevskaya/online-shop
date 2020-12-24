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
      case ProductType.Tv:
        return;
      case ProductType.SmartWatch:
        return;
      case ProductType.Headphones:
        return this.mapHeadphonesToDescription(product as Headphones);
    }
  }

  private mapPhoneToDescription(product: Phone): ProductDescription {
    return [
      {
        title: 'Общая информация',
        children: [
          {
            name: 'Дата выхода на рынок',
            value: product.year
          }
        ]
      },
      {
        title: 'Основные',
        children: [
          {
            name: 'Операционная система',
            value: product.operating_system
          },
          {
            name: 'Оперативная память',
            value: product.memory
          },
          {
            name: 'Флэш-память',
            value: product.storage
          }
        ]
      },
      {
        title: 'Камера',
        children: [
          {
            name: 'Основная камера',
            value: product.main_camera_mp
          },
          {
            name: 'Фронтальная камера',
            value: product.front_camera_mp
          }
        ]
      },
      {
        title: 'Процессор',
        children: [
          {
            name: 'Процессор',
            value: product.processor
          }
        ]
      },
      {
        title: 'Экран',
        children: [
          {
            name: 'Размер экрана',
            value: product.screen.size
          },
          {
            name: 'Разрешение экрана',
            value: `${product.screen.resolution_w}x${product.screen.resolution_h}`
          },
          {
            name: 'Технология экрана',
            value: product.screen.technology
          }
        ]
      },
      {
        title: 'Аккумулятор и время работы',
        children: [
          {
            name: 'Емкость аккумулятора',
            value: `${product.accumulator} мА·ч`
          }
        ]
      }
    ];
  }

  private mapHeadphonesToDescription(product: Headphones): ProductDescription {
    return [
      {
        title: 'Общая информация',
        children: [
          {
            name: 'Назначение',
            value: `${this.mappingService.mapHeadphonesPurpose(
              product.purpose
            )}`
          },
          { name: 'Дата выхода на рынок', value: `${product.year}` }
        ]
      },
      {
        title: 'Основные',
        children: [
          {
            name: 'Тип',
            value: `${this.mappingService.mapHeadphonesKind(product.kind)}`
          },
          {
            name: 'Беспроводной интерфейс',
            value: `${product.wireless_interface ? 'есть' : 'нет'}`
          },
          ...(product.wireless_interface_type
            ? [
                {
                  name: 'Тип беспроводного интерфейса',
                  value: `${product.wireless_interface_type}`
                }
              ]
            : [])
        ]
      },
      ...(product.hours_capacity
        ? [
            {
              title: 'Время работы',
              children: [
                {
                  name: 'Максимальное время работы',
                  value: `${product.hours_capacity}`
                }
              ]
            }
          ]
        : [])
    ];
  }
}
