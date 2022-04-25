import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, first, Observable, tap } from 'rxjs';
import { User } from '../model/user';
import { HandlingService } from './error-handling/error.handling.service';

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
  
  constructor(private http: HttpClient, private router: Router, private errorHandler: HandlingService) { }

  register(user: Omit<User, "id">): Observable<User> {
    return this.http.post<User>('/api/register', user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandler.handleError<User>("register"))
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
        this.router.navigateByUrl('/');
      }),

    );
  } 

  //User Management
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users', {responseType: 'json'}).pipe(
      catchError(this.errorHandler.handleError<User[]>('getUsers', []))
    );
  }

  createUser(formData: Partial<User>): Observable<User> {
    return this.http.post<User>('/api/createUser', 
    {name: formData.name, number: formData.number, email: formData.email, password: formData.password, role: formData.role},
    this.httpOptions).pipe(
      catchError(this.errorHandler.handleError<User>('createUser'))
    );
  }

  deleteUser(id: Pick<User, 'id'>): Observable<{}> {
    return this.http.delete<User>('/api/users/'+id, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandler.handleError<User>("deletePost"))
      );
  }
}
