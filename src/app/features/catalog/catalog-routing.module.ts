import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductType } from '@core/enums/product-type';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'phone',
    pathMatch: 'full'
  },
  {
    path: 'phone',
    component: CatalogComponent,
    data: { productType: ProductType.Phone }
  },
  {
    path: 'phone/:id',
    component: ProductPageComponent,
    data: {
      productType: ProductType.Phone
    }
  },
  {
    path: 'headphones',
    component: CatalogComponent,
    data: { productType: ProductType.Headphones }
  },
  {
    path: 'headphones/:id',
    component: ProductPageComponent,
    data: { productType: ProductType.Headphones }
  },
  {
    path: 'smartwatches',
    component: CatalogComponent,
    data: { productType: ProductType.SmartWatch }
  },
  {
    path: 'smartWatch/:id',
    component: ProductPageComponent,
    data: { productType: ProductType.SmartWatch }
  },
  {
    path: 'laptops',
    component: CatalogComponent,
    data: { productType: ProductType.Laptop }
  },
  {
    path: 'laptop/:id',
    component: ProductPageComponent,
    data: { productType: ProductType.Laptop }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {}
