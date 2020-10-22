import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseurl: string;
  constructor(
    private http: HttpClient
  ) {
    this.baseurl = environment.API;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public Add(data: any): Observable<User>{
    return this.http.post<User>(this.baseurl + 'user', data)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public addlogin(Logindata: any): Observable<User> {
    return this.http.post<User>(this.baseurl + 'user', Logindata);
  }
  public getbyLogin(email: string): Observable<User> {
    return this.http.get<User>(this.baseurl + `user?email=${email}`);
  }

  checkpermission() {
    if (localStorage.getItem('userPermision') === 'true') {
        return true;
    }
    return false;
  }
  getToken() {
    return localStorage.getItem('token');
  }

  public ListUser(id): Observable<User>{
    return this.http.get<User>(this.baseurl + 'User/' + id);
  }
}
