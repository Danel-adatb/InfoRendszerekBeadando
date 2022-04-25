import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Menu } from '../model/menu';
import { User } from '../model/user';
import { HandlingService } from './error-handling/error.handling.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"}),
  }

  constructor(private http: HttpClient, private errorHandler: HandlingService) { }

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
        catchError(this.errorHandler.handleError<Menu>("createOrder"))
      );
  }
}
