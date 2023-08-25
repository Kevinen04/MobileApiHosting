import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MenuItemComponent],
  exports: [MenuItemComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class MenuItemModule { }
