import { Injectable } from '@angular/core';
import { ProductType } from '@core/enums/product-type';
import { HeadphonesPurpose } from '@core/enums/headphones-purpose';
import { HeadphonesKind } from '@core/enums/headphones-kind';
import { Product } from '@core/types/product';
import { from } from 'rxjs';

@Injectable()
export class MappingTextService {
  public mapHeadphonesPurpose(purpose: HeadphonesPurpose) {
    switch (purpose) {
      case HeadphonesPurpose.Sport:
        return 'спортивные';
      case HeadphonesPurpose.Gaming:
        return 'геймерские';
      case HeadphonesPurpose.Portable:
        return 'портативные';
    }
  }

  public mapHeadphonesKind(kind: HeadphonesKind) {
    switch (kind) {
      case HeadphonesKind.Headphones:
        return 'наушники';

      case HeadphonesKind.headphonesWithMic:
        return 'наушники с микрофоном';
    }
  }
}
