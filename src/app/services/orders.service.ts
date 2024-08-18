import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, ReplaySubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public refreshOrdersTable$: Subject<void> = new Subject<void>();
  public selectedOrder$: ReplaySubject<Order | null> = new ReplaySubject<Order | null>(); 
  public displayOrders$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public getListOfUserOrders(userId: number): Observable<Order[]> {
    const url = `${environment.api}orders/user-orders/${userId}/`;
    return this.http.get<Order[]>(url)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when getting List of Orders',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }

  public createOrder(order: Order): Observable<Order> {
    const url = `${environment.api}orders/create-order/`;
    return this.http.post<Order>(url, order)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when creating Order',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }

  public payOrder(orderId: number): Observable<void> {
    const url = `${environment.api}orders/pay-order/${orderId}/`;
    return this.http.post<void>(url, orderId)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when paying Order',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }

  public cancelOrder(orderId: number): Observable<void> {
    const url = `${environment.api}orders/cancel-order/${orderId}/`;
    return this.http.post<void>(url, orderId)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when cancelling Order',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }

}
