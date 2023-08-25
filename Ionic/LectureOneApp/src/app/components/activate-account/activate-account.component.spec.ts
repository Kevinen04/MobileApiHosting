import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent  implements OnInit {

  public activateAccountLabelText: string;
  public isLinkSent = false;

  constructor() { 
    this.activateAccountLabelText = 'Send link to activate your account.';
  }

  ngOnInit() {}

  public sendLink(): void {
    this.activateAccountLabelText = 'A link has been sent to your email address';
    this.isLinkSent = true;
  }
}