import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  
  public ordersService = inject(OrdersService);
  public authService = inject(AuthService);
  public orders: Order[] = [];
  
  ngOnInit(): void {
    this.getLoggedUserOrders();
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

}
