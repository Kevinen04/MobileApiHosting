import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  doSomething() {
    const today = new Date();
    const referenceDate = new Date(2023, 2, 1);
    const diffDays = this.findDays(today, referenceDate);
    console.log(diffDays);
    
  }
  private findDays(date1: Date, date2: Date): number {
    const diffMillis = date1.getTime() - date2.getTime();
    const diffDays = Math.floor(diffMillis/(1000*3600*24));
    return diffDays;
  }

  
}
