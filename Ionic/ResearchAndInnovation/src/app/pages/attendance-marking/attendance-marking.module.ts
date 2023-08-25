import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceMarkingPageRoutingModule } from './attendance-marking-routing.module';

import { AttendanceMarkingPage } from './attendance-marking.page';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceMarkingPageRoutingModule
  ],
  declarations: [AttendanceMarkingPage],
  providers: [FingerprintAIO]
})
export class AttendanceMarkingPageModule {}
