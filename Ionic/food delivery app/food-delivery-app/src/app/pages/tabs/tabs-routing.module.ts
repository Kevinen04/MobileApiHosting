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
        redirectTo: 'restaurant',
        pathMatch: 'full'
      },
      {
        path: 'restaurant',
        loadChildren: () => import('src/app/pages/restaurant/restaurant.module').then( m => m.RestaurantsPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('src/app/pages/cart/cart.module').then( m => m.CartPageModule)
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
