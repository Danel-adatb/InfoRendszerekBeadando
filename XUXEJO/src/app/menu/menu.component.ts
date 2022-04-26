import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Menu } from '../model/menu';
import { User } from '../model/user';
import { MenuService } from '../service/menu.service';
import { UserService } from '../service/user.service';
import foodsJSON from '../../assets/menu.json'

interface FOODS {
  id: number;
  foodName: string;
  imgUrl: string;
  category: string;
  description: string;
  price: number;
  preparation: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  orderables: FOODS[] = foodsJSON;
  userId!: Pick<User, 'id'>;
  form!: FormGroup;
  response: string | undefined = undefined;

  constructor(private menuService: MenuService, private userService: UserService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.userId = this.userService.id;

    this.form = this.formBuilder.group(
      {
        foodName: new FormControl("", [
          Validators.required
        ]),
        imgUrl: new FormControl("", [
          Validators.required
        ]),
        category: new FormControl("", [
          Validators.required
        ]),
        description: new FormControl("", [
          Validators.required
        ]),
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

    onSubmit(formData: Partial<Menu>): void {
      this.menuService.createOrder(formData, this.userId).pipe().subscribe(() => {
        this.response = 'Added succesfully: ' + formData.foodName;
      });
    }
}
