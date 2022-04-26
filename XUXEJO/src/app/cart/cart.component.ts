import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Cart } from '../model/cart';
import { Menu } from '../model/menu';
import { User } from '../model/user';
import { CartService } from '../service/cart.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders$!: Observable<Menu[]>;
  maxPrice$!: Observable<Menu[]>;
  maxPrep$!: Observable<Menu[]>;
  userId!: Pick<User, 'id'>;
  form!: FormGroup;
  errorMessage: string | undefined = undefined;

  constructor(private cartService: CartService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.orders$ = this.fetchAll();
    this.userId = this.userService.id;
    this.maxPrice$ = this.getMaxPrice();
    this.maxPrep$ = this.getMaxPrep();

    this.form = this.formBuilder.group(
      {
        price: new FormControl("", [
          Validators.required
        ]),
        preparation: new FormControl("", [
          Validators.required
        ]),
        uploaderId: new FormControl("", [
          Validators.required
        ])
      });
  }

  fetchAll(): Observable<Menu[]> {
    return this.cartService.getOrders();
  }

  getMaxPrice(): Observable<Menu[]> {
    return this.cartService.getMaxPrice();
  }

  getMaxPrep(): Observable<Menu[]> {
    return this.cartService.getMaxPrep();
  }

  onSubmit(formData: Partial<Cart>): void {
    this.cartService.createFinalOrder(formData).pipe().subscribe(() => {
      this.abortOrder()
    });
  }

  delete(id: Pick<Menu, 'id'>): void {
    this.cartService.deleteOrder(id).subscribe(() => (
      this.orders$ = this.fetchAll(),
      this.maxPrice$ = this.getMaxPrice(),
      this.maxPrep$ = this.getMaxPrep()
    ));
  }

  abortOrder(): void {
    this.cartService.deleteAll().subscribe(() => (
      this.orders$ = this.fetchAll(),
      this.maxPrice$ = this.getMaxPrice(),
      this.maxPrep$ = this.getMaxPrep()
    ));
  }

  getDiscount(total: number) {
    if(total > 5000) {
      const discount = total / 10;
      total = total - discount;
    }
    
    return total;
  }

}
