import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent  implements OnInit {

  @Input() public menuItem: MenuItem = {
    id: '',
    category: '',
    description: '',
    name: '',
    price: 0
  };

  @Output() public addToCartEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  public addToCart(id: string): void {
    console.log('menu item Id:', id);
    this.addToCartEvent.emit(id);
  }

}
