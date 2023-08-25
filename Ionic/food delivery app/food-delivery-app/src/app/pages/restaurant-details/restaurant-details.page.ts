import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {

public restaurant: Restaurant = {
  id:'',
  description:'',
  logo:'',
  menuItems:[],
  name:'',
  phoneNumber:'',
  staffIds: []
}

  private restaurantId: string = '';

  constructor(private activatedRoute:   ActivatedRoute, private restaurantService: RestaurantService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')){
        this.restaurantId = paramMap.get('id') as string;
      }
    });
   }

  ngOnInit() {
  }

}
