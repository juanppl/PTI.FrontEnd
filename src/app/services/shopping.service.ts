import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  public refreshProductsFromCart$: Subject<void> = new Subject<void>();

  private productsFromCart: Product[] = [];

  constructor() { }

  public getProductsInCart(): Product[] {
    return this.productsFromCart;
  }

  public addProductToCart(product: Product): void {
    this.productsFromCart.push(product);
  }

  public removeProductFromCart(productId: number): void {
    const foundProductIdx = this.productsFromCart.findIndex(p => p.id == productId);
    this.productsFromCart.splice(foundProductIdx, 1);
  }

}
