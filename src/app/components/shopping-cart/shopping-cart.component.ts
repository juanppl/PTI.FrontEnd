import { Component, inject } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  private shoppingService = inject(ShoppingService);
  public cartProducts: Product[] = [];

  constructor() {
    this.getProductsFromCart();
    this.shoppingService.refreshProductsFromCart$.subscribe(_ => this.getProductsFromCart());
  }

  public getProductsFromCart(): void {
    this.cartProducts = this.shoppingService.getProductsInCart();
    console.log(this.cartProducts, 'cart products');
  }

}
