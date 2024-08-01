import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateUser, LoggedInUser } from '../models/Auth';
import { UserProfile } from '../models/User';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public setLoggedInUser(userData: LoggedInUser): void {
    if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  public getLoggedUser(): LoggedInUser {
    return JSON.parse(localStorage.getItem('userData')!);
  }

  public logIn(username: string, password: string): Observable<LoggedInUser | null> {
    const url = `${environment.api}user-login/`;
    return this.http.post<LoggedInUser>(url, { username, password }).pipe(
      catchError((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error when logging in',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return of(null);
      })
    );
  }

  public createUser(user: CreateUser): Observable<void> {
    return this.http.post<void>(`${environment.api}register/`, user).pipe(
      catchError((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error when creating user',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return of();
      })
    );
  }

  public getUserProfile(userId: string|null): Observable<UserProfile | null> {
    return this.http.get<UserProfile>(`${environment.api}v1/users/${userId}/`).pipe(
      catchError((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error when getting user info',
          html: `${err.error.Message} ${err.error.Id}`
        });
        return of(null);
      })
    );
  }

}
