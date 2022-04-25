import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private user: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: new FormControl("", [
          Validators.required
        ]),
        password: new FormControl("", [
          Validators.required
        ])
      });
  }
  

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(email: Pick<User, 'email'>, password: Pick<User, 'password'>) { 
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.user.login(email, password).subscribe();
  }
}
