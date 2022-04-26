import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Menu } from '../model/menu';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  }

  constructor(private http: HttpClient) { }

  createOrder(formData: Partial<Menu>, userId: Pick<User, 'id'>): Observable<Menu> {
    return this.http.post<Menu>('/api/createOrder',
        { foodName: formData.foodName, 
          imgUrl: formData.imgUrl, 
          category: formData.category,
          description: formData.description, 
          price: formData.price, 
          preparation: formData.preparation,
          uploaderId: userId },
        this.httpOptions
      )
      .pipe(
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
