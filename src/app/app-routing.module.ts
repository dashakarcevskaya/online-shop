import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
  {
    path: 'main-page',
    loadChildren: () =>
      import('./features/main-page/main-page.module').then(
        (m) => m.MainPageModule
      )
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then((m) => m.CatalogModule)
  },
  {
    path: 'sign-in-page',
    loadChildren: () =>
      import('./features/sign-in-page/sign-in-page.module').then(
        (m) => m.SignInPageModule
      )
  },
  {
    path: 'sign-up-page',
    loadChildren: () =>
      import('./features/sign-up-page/sign-up-page.module').then(
        (m) => m.SignUpPageModule
      )
  },
  {
    path: 'compare-page',
    loadChildren: () =>
      import('./features/compare-page/compare-page.module').then(
        (m) => m.ComparePageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
