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
  },
  {
    path: 'cart-page',
    loadChildren: () =>
      import('./features/cart-page/cart-page.module').then(
        (m) => m.CartPageModule
      )
  },
  {
    path: 'user-account',
    loadChildren: () =>
      import('./features/user-account/user-account.module').then(
        (m) => m.UserAccountModule
      )
  },
  {
    path: 'order-page',
    loadChildren: () =>
      import('./features/order-page/order-page.module').then(
        (m) => m.OrderPageModule
      )
  },
  {
    path: 'forgot-password-page',
    loadChildren: () =>
      import(
        './features/forgot-password-page/forgot-password-page.module'
      ).then((m) => m.ForgotPasswordPageModule)
  },
  {
    path: 'check-page',
    loadChildren: () =>
      import('./features/check-page/check-page.module').then(
        (m) => m.CheckPageModule
      )
  },
  {
    path: 'order-history',
    loadChildren: () =>
      import('./features/order-history/order-history.module').then(
        (m) => m.OrderHistoryModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
