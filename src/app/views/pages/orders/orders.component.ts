import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2';
import { OrderPaymentComponent } from '../order-payment/order-payment.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, OrderPaymentComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  
  public ordersService = inject(OrdersService);
  public authService = inject(AuthService);
  public orders: Order[] = [];
  public isPayingOrder = false;

  private subscription$: Subscription;
  private subscriptionTable$: Subscription;

  constructor() {
    this.subscription$ = this.ordersService.refreshOrdersTable$.subscribe(_ => this.getLoggedUserOrders());
    this.subscriptionTable$ = this.ordersService.displayOrders$.subscribe(isPaying => this.isPayingOrder = isPaying);
  }
  
  ngOnInit(): void {
    this.getLoggedUserOrders();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscriptionTable$.unsubscribe();
  }

  private getLoggedUserOrders(): void {
    const user = this.authService.getLoggedUser();
    this.ordersService.getListOfUserOrders(user.id)
      .subscribe({
        next: (orders: Order[]) => {
          this.orders = orders;
        }
      });
  }

  public cancelOrder(orderId: number): void {
    Swal.fire({
      title: "Cancelar Orden",
      text: "La orden va a ser cancelada, desea continuar ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, Volver",
      confirmButtonColor: "#6ca100",
      confirmButtonText: "Si, Continuar",
    }).then((result) => {
      if (result.value) {
        this.cancelSelectedOrder(orderId);
      }
    });
  }

  private cancelSelectedOrder(orderId: number): void {
    this.ordersService.cancelOrder(orderId)
      .subscribe({
        next: _ => {
          this.getLoggedUserOrders();
          Swal.fire({
            icon: 'success',
            title: 'Orden Cancelada',
            text: 'La orden ha sido cancelada satisfactoriamente!'
          });
        }
      });
  }

  public sendOrderToBePaid(order: Order): void {
    this.isPayingOrder = true;
    this.ordersService.selectedOrder$.next(order);
  }

}
