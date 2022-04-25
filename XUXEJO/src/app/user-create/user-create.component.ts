import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form!: FormGroup;
  users$!: Observable<User[]>;

  userRole!: string;
  isAdmin: boolean = false;
  submitted = false;
    
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    //Check for 
    this.form = this.formBuilder.group(
      {
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("[a-zA-Z0-9 ]*")
        ]),
        number: new FormControl("", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$"),
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
        ]),
        role: new FormControl("", [
          Validators.required
        ]),
      }
    );

    //Check for admin role
    this.userRole = this.userService.role;
    if(this.userRole == 'ADMIN') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  fetchAll(): Observable<User[]> {
    return this.userService.getUsers();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void { 
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.userService
      .createUser(this.form.value).pipe().subscribe(() => (
        this.router.navigateByUrl('/user'),
        this.users$ = this.fetchAll() 
      ));
  }

}
