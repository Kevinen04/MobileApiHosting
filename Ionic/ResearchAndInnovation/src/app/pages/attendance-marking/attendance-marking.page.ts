import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';


@Component({
  selector: 'app-attendance-marking',
  templateUrl: './attendance-marking.page.html',
  styleUrls: ['./attendance-marking.page.scss'],
})


export class AttendanceMarkingPage implements OnInit {


  constructor(private fingerprintAIO: FingerprintAIO) { }

  async presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Successful';
    alert.subHeader = 'Attendance';
    alert.message = 'Your attendance have been recorded';
    alert.buttons = ['OK'];

     await alert.present();
  }

  async failedAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Failed';
    alert.subHeader = 'Attendance';
    alert.message = 'Please try again';
    alert.buttons = ['OK'];

     await alert.present();
  }

  async present(){
    try {
      const result = await this.fingerprintAIO.show({
        // clientId: 'my_app_id', // Unique identifier for your app
        // clientSecret: 'my_app_secret', // Optional, only for Android
        // localizedFallbackTitle: 'Use Pin', // Fallback button text (optional)
        //localizedReason: 'Please authenticate with your fingerprint', // Prompt text
        disableBackup: true, // Prevent using backup authentication method (optional)
      });

      // Authentication successful
    this.presentAlert();
    } catch (error) {
      // Authentication failed or canceled
     this.failedAlert();
    }
  }

  ngOnInit() {
  }

}
