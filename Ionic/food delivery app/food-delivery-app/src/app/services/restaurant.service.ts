import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[] = [
    {
        id: "1",
        name: "Chinese Wok",
        description: "Fine Chinese cuisine established since the 1990s",
        phoneNumber: "+230 670 4646",
        staffIds: ["1"],
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrssxsriwLKYM6d5IALZC-I2duSKk6YbzEkQ&usqp=CAU",
        menuItems: []
    },
    {
        id: "2",
        name: "Sitar Bagatelle",
        description: "Restaurant servomg indian food located at Bagatelle",
        phoneNumber: "+230 670 4747",
        staffIds: ["3", "4"],
        logo: "https://mymenu.mu/wp-content/uploads/2022/11/sitar-01.png",
        menuItems:[]
        
           
    },
    {
        id: "3",
        name: "Papa Jean",
        description: "Pizza cooked in a wooden oven",
        phoneNumber: "+230 670 2323",
        staffIds: ["5"],
        logo: "https://logowik.com/content/uploads/images/pizza-papa-johns2504.logowik.com.webp",
        menuItems: []
        
    }
]

  constructor() { }

  public getAllRestaurants(): Restaurant[] {
    return this.restaurants;
  }
  public getRestaurantById(id: string) : Restaurant{
    return this.restaurants.find(r => r.id === id) as Restaurant;
  }
}