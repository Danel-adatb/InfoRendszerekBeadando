import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../model/menu';
import { catchError, first, Observable, throwError } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  }

  constructor(private http: HttpClient) { }

  //Fetch all foods
  getOrders(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/api/orders', {responseType: 'json'}).pipe(
      catchError(this.ErrorHandler)
    );
  }
  
  getMaxPrice(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/api/getMaxPrice').pipe(
      catchError(this.ErrorHandler)
    );
  }

  getMaxPrep(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/api/getMaxPrep').pipe(
      catchError(this.ErrorHandler)
    );
  }

  createFinalOrder(formData: Partial<Cart>): Observable<Cart> {
    return this.http.post<Cart>('/api/addFinal',
        { price: formData.price, 
          preparation: formData.preparation,
          uploaderId: formData.uploaderId },
        this.httpOptions
      )
      .pipe(
        catchError(this.ErrorHandler)
      );
  }

  deleteOrder(id: Pick<Menu, 'id'>): Observable<{}> {
    return this.http.delete<Menu>('/api/deleteOrder/'+id, this.httpOptions).pipe(
        first(),
        catchError(this.ErrorHandler)
      );
  }

  deleteAll() {
    return this.http.delete<Menu>('/api/deleteAllOrder', this.httpOptions).pipe(
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
