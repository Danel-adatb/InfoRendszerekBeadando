import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, first, Observable, tap, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  id!: Pick<User, 'id'>;
  role!: string;
  
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  }
  
  constructor(private http: HttpClient, private router: Router) { }

  register(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>('/api/register', user, this.httpOptions).pipe(
      first(),
      catchError(this.ErrorHandler)
    );
  }

  login(email: Pick<User, 'email'>, password: Pick<User, 'password'>): Observable<{ token: string, id: Pick<User, 'id'>, role: string}> {
    return this.http.post('/api/login', {email, password}, this.httpOptions)
    .pipe(
      first(Object),
      tap((tokenObject: {token: string, id: Pick<User, 'id'>, role: string}) => {
        this.id = tokenObject.id;
        this.role = tokenObject.role;
        localStorage.setItem("token", tokenObject.token);
        this.isUserLoggedIn$.next(true);
      }),
      catchError(this.ErrorHandler)
    );
  } 

  //User Management
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users', {responseType: 'json'}).pipe(
      catchError(this.ErrorHandler)
    );
  }

  createUser(formData: Partial<User>): Observable<User> {
    return this.http.post<User>('/api/createUser', 
    {name: formData.name, number: formData.number, email: formData.email, password: formData.password, role: formData.role},
    this.httpOptions).pipe(
      first(),
      catchError(this.ErrorHandler)
    );
  }

  deleteUser(id: Pick<User, 'id'>): Observable<{}> {
    return this.http.delete<User>('/api/users/'+id, this.httpOptions)
      .pipe(
        first(),
        catchError(this.ErrorHandler)
      );
  }

  private ErrorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
