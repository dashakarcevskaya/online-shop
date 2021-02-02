import { Injectable } from '@angular/core';
import { HeadphonesPurpose } from '@core/enums/headphones-purpose';
import { HeadphonesKind } from '@core/enums/headphones-kind';

@Injectable({
  providedIn: 'root'
})
export class MappingTextService {
  public mapHeadphonesPurpose(purpose: HeadphonesPurpose) {
    switch (purpose) {
      case HeadphonesPurpose.Sport:
        return 'sport';
      case HeadphonesPurpose.Gaming:
        return 'gaming';
      case HeadphonesPurpose.Portable:
        return 'portable';
    }
  }

  public mapHeadphonesKind(kind: HeadphonesKind) {
    switch (kind) {
      case HeadphonesKind.Headphones:
        return 'headphones';

      case HeadphonesKind.headphonesWithMic:
        return 'headphones with microphone';
    }
  }
}
