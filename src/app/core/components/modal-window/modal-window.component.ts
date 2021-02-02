import { Component } from '@angular/core';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.less']
})
export class ModalWindowComponent {
  constructor(private modalService: ModalService) {}

  public getMessage(): string {
    return this.modalService.message;
  }
}
