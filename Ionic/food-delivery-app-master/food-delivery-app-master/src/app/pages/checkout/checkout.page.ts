import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { MenuItem } from 'src/app/models/menu-item';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  public groupedCartItems: { menuItem: MenuItem, quantity: number}[] = [];
  public restaurantName: string = '';
  public total: number = 0;
  public form = this.formBuilder.group({
    id: [''],
    customerId: [''],
    menuItemIds: [['']],
    approverId: [''],
    restaurantId: [''],
    dateTime: [new Date()],
    totalPrice: [0],
    delivery: ['1'],
    deliveryAddress: [''],
    status: ['0']
  });

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private ordersService: OrdersService,
    private navController: NavController,
    private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    const restaurantId = this.cartService.getCart().restaurantId;
    const cartItems = this.cartService.getCartItems();
    this.setGroupedCartItems(cartItems);
    this.cartService.getCartTotal().subscribe(total => {
      this.total = total;
      this.form.patchValue({ totalPrice: total });
    });
    
    this.restaurantService.getRestaurantById(restaurantId).subscribe(restaurant => this.restaurantName = restaurant.name);
    const orderId = crypto.randomUUID() as string;
    this.form.patchValue({
      restaurantId: restaurantId,
      menuItemIds: cartItems.map(c => c.id),
      customerId: this.authService.getUserId(),
      id: orderId
    });
  }

  public createOrder(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.ordersService.createOrder(this.form.value as Order).subscribe(order => {
        if(order) {
          this.cartService.clearCart();
          this.navController.navigateForward('/tabs/orders');
        }
      });
    }
  }

  public cancel(): void {
    this.navController.back();
  }


public async useCurrentLocation(): Promise<void>{
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('location', coordinates);

  this.nativeGeocoder.reverseGeocoder(
    coordinates.coords.latitude,
    coordinates.coords.longitude,
    { useLocale: true, maxResults: 1})
    .then((result) => {
      const firstResult = result[0];
      const address = ${firstResult.subLocality}, ${firstResult.Locality} ${firstResult.countryName};
      this.form.patchValue({ deliveryAddress: address})
      console.log("First Result:" +JSON.stringify(firstResult));
    }).catch(err => console.log(err));
}



  private setGroupedCartItems(cartItems: MenuItem[]): void {
    const ids = [... new Set(cartItems.map(c => c.id))];
    this.groupedCartItems = ids.map(id => {
      const menuItem = cartItems.find(c => c.id === id) as MenuItem;
      const quantity = cartItems.filter(c => c.id === id).length;
      return { menuItem, quantity };
    });
  }

}
