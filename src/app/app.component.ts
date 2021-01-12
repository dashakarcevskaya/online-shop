import { Component } from '@angular/core';

import { AuthService } from '@core/services/auth.service';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}
  public title = 'online-shop';
  public showModalWindow(): boolean {
    return this.modalService.isVisible;
  }
}
