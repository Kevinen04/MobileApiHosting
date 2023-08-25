import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'restaurants',
        pathMatch: 'full'
      },
      {
        path: 'restaurants',
        loadChildren: () => import('src/app/pages/restaurants/restaurants.module').then(m => m.RestaurantsPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('src/app/pages/cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('src/app/pages/orders/orders.module').then(m => m.OrdersPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
