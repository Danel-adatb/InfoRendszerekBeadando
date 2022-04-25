import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../model/menu';
import { catchError, first, Observable } from 'rxjs';
import { Cart } from '../model/cart';
import { HandlingService } from './error-handling/error.handling.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  }

  constructor(private http: HttpClient, private errorHandler: HandlingService) { }

  //Fetch all foods
  getOrders(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/api/orders', {responseType: 'json'}).pipe(
      //catchError(this.errorHandler.handleError<Menu[]>('getOrders', []))
    );
  }
  
  getMaxPrice(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/api/getMaxPrice').pipe(
      catchError(this.errorHandler.handleError<Menu[]>('getMaxPrice', []))
    );
  }

  getMaxPrep(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/api/getMaxPrep').pipe(
      catchError(this.errorHandler.handleError<Menu[]>('getMaxPrep', []))
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
        catchError(this.errorHandler.handleError<Cart>("addFinal"))
      );
  }

  deleteOrder(id: Pick<Menu, 'id'>): Observable<{}> {
    return this.http.delete<Menu>('/api/deleteOrder/'+id, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandler.handleError<Menu>("deleteOrder"))
      );
  }

  deleteAll(): Observable<{}> {
    return this.http.delete<Menu>('/api/deleteAllOrder', this.httpOptions).pipe(
      catchError(this.errorHandler.handleError<Menu>("deleteAllOrder"))
    );
  }
}
