import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public login(): void {
    console.log('username:', this.username);
    if (this.username && this.username.trim() != '') {
      this.authService.authenticate(this.username);
      this.router.navigate(['/tabs']);
    }
  }
}
