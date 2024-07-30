import { Injectable } from '@angular/core';
import { catchError, Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public refreshTable$: Subject<void> = new Subject<void>();
  public selectedProduct$: ReplaySubject<Product | null> = new ReplaySubject<Product | null>(); 
  public displayTable$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private http: HttpClient) { }

  public getListOfProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`assets/data/mock-products.json`)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when getting List of Products',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }
}
