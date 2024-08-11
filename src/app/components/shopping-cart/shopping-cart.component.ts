import { Component, inject } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Product } from 'src/app/models/Product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe],
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
  }

  public removeProductFromCart(product: Product) {
    this.shoppingService.removeProductFromCart(product.id!);
    this.getProductsFromCart();
  }

}
