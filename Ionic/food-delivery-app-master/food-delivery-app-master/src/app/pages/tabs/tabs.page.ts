import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public itemsInCart = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartCount().subscribe(cartCount => this.itemsInCart = cartCount);
  }

}
