import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent {
  @Input() href: string;
  @Input() image: string;
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
}
