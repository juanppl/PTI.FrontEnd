import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { OrdersService } from 'src/app/services/orders.service';
import { Payment } from 'src/app/models/Payment';
import { NgxMaskDirective } from 'ngx-mask';
import { Product } from 'src/app/models/Product';
import { OrderItems } from 'src/app/models/OrderItems';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-payment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxMaskDirective, SpinnerComponent],
  templateUrl: './order-payment.component.html',
  styleUrl: './order-payment.component.scss'
})
export class OrderPaymentComponent implements OnInit, OnDestroy {

  private ordersService = inject(OrdersService);

  private subscription$: Subscription;
  public order: Order | null = this.initializeOrder();
  public payment: Payment = <Payment>{};
  public isBeingPaid = false;
  
  constructor() {
    this.subscription$ = this.ordersService.selectedOrder$
      .subscribe((order: Order | null) => {
        this.order = order;
        if (!this.order) this.order = this.initializeOrder();
      });
  }

  private initializeOrder(): Order | null {
    return {
      id: null,
      user: null,
      price: 0,
      cancelledDate: null,
      creationDate: null,
      paidDate: null,
      status: '',
      wasCancelled: false,
      items: []
    };
  }
  
  ngOnInit(): void {
    
  }
  
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public cancel(): void {
    this.ordersService.displayOrders$.next(false);
  }

  public getProductProp(item: OrderItems, prop: keyof Product): string {
    if(item!.product && typeof item!.product == 'object') {
      return item!.product[prop]!.toString();
    }
    return '';
  }

  public payOrder(): void {
    this.isBeingPaid = true;
    setTimeout(() => {
      this.ordersService.payOrder(this.order!.id!)
        .subscribe({
          next: _ => {
            this.ordersService.displayOrders$.next(false);
            this.ordersService.refreshOrdersTable$.next();
            Swal.fire({
              icon: 'success',
              title: 'Orden Pagada Exitosamente!',
              text: 'Se ha pagado la orden de manera exitosa!'
            });
            this.isBeingPaid = false;
          }
        });
    }, 2000);
  }

}
