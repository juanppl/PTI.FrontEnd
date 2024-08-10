import { Injectable } from '@angular/core';
import { catchError, Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public refreshTable$: Subject<void> = new Subject<void>();
  public selectedProduct$: ReplaySubject<Product | null> = new ReplaySubject<Product | null>(); 
  public displayTable$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private http: HttpClient) { }

  public getListOfProducts(): Observable<Product[]> {
    const url = `${environment.api}products/get-all-products`;
    return this.http.get<Product[]>(url)
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

  public createProduct(product: Product): Observable<Product> {
    const url = `${environment.api}products/create`;
    product.category = product.categoryId;
    return this.http.post<Product>(url, product)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when creating Product',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }

  public editProduct(product: Product): Observable<Product> {
    const url = `${environment.api}products/${product.id}/update`;
    product.category = product.categoryId;
    return this.http.put<Product>(url, product)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when editing Product',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }

  public deleteProduct(productId: number): Observable<void> {
    const url = `${environment.api}products/${productId}/delete`;
    return this.http.delete<void>(url)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when deleting Product',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }

}
