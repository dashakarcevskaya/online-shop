import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompareService } from '@core/services/compare.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent {
  constructor(private compareService: CompareService) {}
  @Input()
  href: string;
  @Input()
  image: string;
  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  price: number;
  @Input()
  canAddToCompare: boolean;
  @Output()
  addedToCompare = new EventEmitter<void>();

  public addToCompare(): void {
    this.addedToCompare.emit();
  }
}
