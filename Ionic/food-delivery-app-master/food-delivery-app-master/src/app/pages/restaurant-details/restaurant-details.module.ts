import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantDetailsPageRoutingModule } from './restaurant-details-routing.module';

import { RestaurantDetailsPage } from './restaurant-details.page';
import { MenuItemModule } from 'src/app/components/menu-item/menu-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuItemModule,
    RestaurantDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RestaurantDetailsPage]
})
export class RestaurantDetailsPageModule {}
