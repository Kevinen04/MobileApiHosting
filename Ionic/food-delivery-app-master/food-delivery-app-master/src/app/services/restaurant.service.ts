import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  public getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get(`${this.baseUrl}restaurants`) as Observable<Restaurant[]>;
  }

  public getRestaurantById(id: string) : Observable<Restaurant> {
    return this.http.get(`${this.baseUrl}restaurants/${id}`) as Observable<Restaurant>;
  }

  public updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put(`${this.baseUrl}restaurants/${restaurant.id}`, restaurant) as Observable<Restaurant>;
  }
}
