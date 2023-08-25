import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter } from 'rxjs';
import { Order } from 'src/app/models/order';
import { Restaurant } from 'src/app/models/restaurant';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  public orders: Order[] = [];
  public restaurants: Restaurant[] = [];

  constructor(
    private ordersService: OrdersService, 
    private router: Router,
    private restaurantsService: RestaurantService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.retrieveOrders());
  }

  public getRestaurantName(id: string): string {
    return this.restaurants.find(r => r.id === id)?.name as string;
  }

  public updateStatus(id: string, status: string): void {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      this.ordersService.updateOrder(order).subscribe(order => {
        if (order) {
          this.retrieveOrders();
        }
      });
    }
  }

  private retrieveOrders(): void {
    const getRestaurants$ = this.restaurantsService.getAllRestaurants();
    const getOrders$ = this.ordersService.getAllOrders();

    combineLatest([getRestaurants$, getOrders$]).subscribe(
      ([restaurants, orders]) => {
        const userId = this.authService.getUserId();
        this.orders = orders
        .map(order => {
          const restaurant = restaurants.find(r => r.id === order.restaurantId);
          if (restaurant) {
            order['restaurantName'] = restaurant.name;
            order['restaurantLogo'] = restaurant.logo;
            order.restaurantStaffIds = restaurant.staffIds;
            order.isCurrentUserRestaurantStaff = restaurant.staffIds.includes(userId);
          }
          return order;
        })
        .filter(o => o.customerId === userId || o.restaurantStaffIds?.includes(userId))
      }
    )
  }
}
