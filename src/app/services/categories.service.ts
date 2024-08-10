import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { catchError, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public getListOfCategories(): Observable<Category[]> {
    const url = `${environment.api}categories/get-list-of-categories`;
    return this.http.get<Category[]>(url)
    .pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error when getting List of Categories',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return [];
      })
    );
  }

}
