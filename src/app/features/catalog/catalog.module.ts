import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';

import { ProductDescriptionService } from './services/product-description.service';
import { ProductShortDescriptionService } from './services/product-short-description.service';
import { MappingTextService } from './services/mapping-text.service';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { SortComponent } from './components/sort/sort.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    FilterComponent,
    CatalogComponent,
    ProductPageComponent,
    SortComponent
  ],
  providers: [
    ProductDescriptionService,
    ProductShortDescriptionService,
    MappingTextService
  ],
  imports: [CommonModule, CatalogRoutingModule]
})
export class CatalogModule {}
