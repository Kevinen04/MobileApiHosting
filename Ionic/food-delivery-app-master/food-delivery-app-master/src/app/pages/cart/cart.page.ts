import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public cartItems: MenuItem[] = [];
  public cartTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().cartItems.subscribe(cartItems => this.cartItems = cartItems);
    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    })
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

}
