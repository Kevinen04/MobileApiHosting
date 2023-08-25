import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: MenuItem[] = [];
  private restaurantId: string = '';
  private cartCount: Subject<number> = new Subject<number>();

  constructor() { }

  public addToCart(restaurantId: string, menuItem: MenuItem): void {
    this.cartItems.push(menuItem);
    this.cartCount.next(this.cartItems.length);
    console.log('cart items:', this.cartItems);
    console.log('menu item added:', menuItem);
  }

  public getCartCount(): Subject<number> {
    return this.cartCount;
  }
}