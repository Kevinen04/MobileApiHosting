import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/models/menu-item';
import { Restaurant } from 'src/app/models/restaurant';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {

  public restaurant: Restaurant = {
    id: '',
    description: '',
    logo: '',
    menuItems: [],
    name: '',
    phoneNumber: '',
    staffIds: []
  };

  public form = this.formBuilder.array<FormGroup>([]);
  public isCurrentUserRestaurantStaff = false;
  public editMode = false;

  private restaurantId: string = '';
  private defaultPicture = "https://images.ctfassets.net/kugm9fp9ib18/3aHPaEUU9HKYSVj1CTng58/d6750b97344c1dc31bdd09312d74ea5b/menu-default-image_220606_web.png";

  constructor(
    private activatedRoute: ActivatedRoute, 
    private cartService: CartService,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder
    ) { 
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.restaurantId = paramMap.get('id') as string;
      }
    });
  }

  ngOnInit() {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(restaurant => {
      this.restaurant = restaurant;
      this.isCurrentUserRestaurantStaff = this.restaurant.staffIds.includes(this.authService.getUserId());
    });
  }

  public addToCart(menuItemId: string): void {
    const menuItem = this.restaurant.menuItems.find(m => m.id === menuItemId) as MenuItem;
    this.cartService.addToCart(this.restaurantId, menuItem);
  }

  public addMenuItem() {
    const newMenuItemId = crypto.randomUUID();

    const menuItemForm = this.formBuilder.group({
      id: [newMenuItemId, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', Validators.required],
      category: ['main'],
      picture: [this.defaultPicture]
    });

    this.form.controls = [menuItemForm, ...this.form.controls];
  }

  public editOrSave(): void {
    if (this.editMode) {
      if (this.form.controls.length > 0 && this.form.valid) {
        this.form.controls.forEach(menuItemForm => this.restaurant.menuItems.push(menuItemForm.value));
        this.restaurantService.updateRestaurant(this.restaurant).subscribe(restaurant => {
          if (restaurant) {
            this.restaurant = restaurant;
            this.form.controls = [];
          }
        });
        this.editMode = false
      }
    } else {
      this.editMode = true;
    }
  }

  public getAddedItemPicture(id: string): string {
    const menuItemAdded = this.form.controls.find(f => f.value.id === id);
    if (menuItemAdded) {
      return menuItemAdded.value.picture;
    }
    return this.defaultPicture;
  }

  public removeMenuItem(id: string): void {
    const menuItemAdded = this.form.controls.find(f => f.value.id === id);
    if (menuItemAdded) {
      this.form.controls = this.form.controls.filter(f => f.value.id !== id)
    }
  }

  public addMenuItemPicture(id: string): void {
    
  }
}
