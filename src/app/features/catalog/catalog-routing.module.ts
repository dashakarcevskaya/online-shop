import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
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
    path: 'headphones',
    component: CatalogComponent,
    data: { productType: ProductType.Headphones }
  },
  {
    path: 'phone/:id',
    component: ProductPageComponent,
    data: { productType: ProductType.Phone }
  },
  {
    path: 'headphones/:id',
    component: ProductPageComponent,
    data: { productType: ProductType.Headphones }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {
  params: any;
  snapshot: any;
}
