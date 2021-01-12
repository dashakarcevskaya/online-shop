import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public isVisible = false;
  public message: string;

  public showModalWindow(message: string) {
    this.isVisible = !this.isVisible;
    this.message = message;
    setTimeout(() => {
      this.isVisible = !this.isVisible;
      this.message = '';
    }, 3000);
  }
}
