import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  public refreshProductsFromCart$: Subject<void> = new Subject<void>();

  // private productsFromCart: Product[] = [];

  constructor() { }

  public getProductsInCart(): Product[] {
    const productsCart  = sessionStorage.getItem('cartProducts');
    return productsCart ? JSON.parse( productsCart) : [];
  }

  public addProductToCart(product: Product): void {
    const productsFromCart = this.getProductsInCart();
    productsFromCart.push(product);
    sessionStorage.setItem('cartProducts', JSON.stringify(productsFromCart));
  }

  public removeProductFromCart(productId: number): void {
    const productsFromCart = this.getProductsInCart();
    const foundProductIdx = productsFromCart.findIndex(p => p.id == productId);
    productsFromCart.splice(foundProductIdx, 1);
    sessionStorage.setItem('cartProducts', JSON.stringify(productsFromCart));
  }

  public doesProductExistsOnCart(productId: number): boolean {
    const productsFromCart = this.getProductsInCart();
    return productsFromCart.some(p => p.id == productId);
  }

  public removeAllProductsFromCart(): void {
    sessionStorage.removeItem('cartProducts');
  }

}
