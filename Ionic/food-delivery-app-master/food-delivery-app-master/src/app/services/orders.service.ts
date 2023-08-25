import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<Order[]> {
    return this.http.get(`${this.baseUrl}orders`) as Observable<Order[]>;
  }

  public createOrder(order: Order): Observable<Order> {
    return this.http.post(`${this.baseUrl}orders`, order) as Observable<Order>;
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.http.put(`${this.baseUrl}orders/${order.id}`, order) as Observable<Order>;
  }
}
