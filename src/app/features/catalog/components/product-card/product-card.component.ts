import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CompareService } from '@core/services/compare.service';
import { Product } from '@core/types/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {
  constructor(private compareService: CompareService) {}
  @Input()
  product: Product;
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
  @Output()
  addedToCart = new EventEmitter<void>();

  ngOnInit(): void {
    this.hasProduct(this.product);
  }

  public addToCompare(): void {
    this.addedToCompare.emit();
  }
  public addToCart(): void {
    this.addedToCart.emit();
  }

  public hasProduct(product: Product): boolean {
    return this.compareService.inProductsList(product);
  }
}
