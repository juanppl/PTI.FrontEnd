import { Component, inject } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Product } from 'src/app/models/Product';
import { CurrencyPipe } from '@angular/common';
import { OrderItems } from 'src/app/models/OrderItems';
import { Order } from 'src/app/models/Order';
import Swal from 'sweetalert2';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  public ordersService = inject(OrdersService);
  public authService = inject(AuthService);
  public router = inject(Router);

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

  public generateOrder(): void {
    const order = this.createOrderBaseOnProduct();
    this.ordersService.createOrder(order)
      .subscribe({
        next: _ => {
          Swal.fire({
            icon: 'success',
            title: 'Orden Creada!',
            text: 'La orden se ha creado satisfactoriamente'
          });
          this.router.navigateByUrl('/orders');
          this.shoppingService.removeAllProductsFromCart();
        }
      });
  }

  private createOrderBaseOnProduct(): Order {
    const cartProducts = this.shoppingService.getProductsInCart();
    return {
      id: null,
      user: this.authService.getLoggedUser().id,
      price: cartProducts.reduce((total, item) => total + (+item.price), 0),
      cancelledDate: null,
      creationDate: null,
      paidDate: null,
      status: 'Pendiente',
      wasCancelled: false,
      items: this.buildOrderItems(cartProducts)
    }
  }

  private buildOrderItems(products: Product[]): OrderItems[] {
    const orderItems: OrderItems[] = [];
    products.map(p => {
      orderItems.push({
        id: null,
        price: +p.price,
        product: p.id,
        quantity: 1
      });
    });
    return orderItems;
  }

}
