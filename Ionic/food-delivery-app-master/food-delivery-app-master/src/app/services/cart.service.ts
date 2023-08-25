import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: MenuItem[] = [];
  private cartItemsSubject: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  private restaurantId: string = '';
  private cartCount: Subject<number> = new Subject<number>();
  private cartTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private toastController: ToastController, private router: Router) { }

  public async addToCart(restaurantId: string, menuItem: MenuItem): Promise<void> {
    if (this.restaurantId === '') {
      this.restaurantId = restaurantId;
    }
    if (this.restaurantId !== restaurantId) {
      const toast = await this.toastController.create({
        message: 'Cannot add to cart!',
        duration: 1500,
        position: 'bottom',
        buttons: [
          {
            text: 'Cart',
            handler: () => this.router.navigate(['/tabs/cart'])
          }
        ]
      });
  
      await toast.present();
      return;
    }

    this.cartItems.push(menuItem);
    this.updateCart();
  }

  public getCartCount(): Subject<number> {
    return this.cartCount;
  }

  public getCartItems(): MenuItem[] {
    return this.cartItems;
  }

  public getCart(): {restaurantId: string, cartItems: Subject<MenuItem[]>} {
    return {
      restaurantId: this.restaurantId,
      cartItems: this.cartItemsSubject
    }
  }

  public getCartTotal(): Subject<number> {
    return this.cartTotal;
  }

  public clearCart(): void {
    this.cartItems = [];
    this.restaurantId ='';
    this.updateCart();
  }

  private updateCart() {
    this.cartCount.next(this.cartItems.length);
    this.cartTotal.next(this.calculateCartTotal());
    this.cartItemsSubject.next(this.cartItems);
  }

  private calculateCartTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => total += item.price);
    return total;
  }
}
