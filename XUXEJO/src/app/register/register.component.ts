import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  errorMessage: any;

  constructor(private user: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(){
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
          Validators.maxLength(9),
          Validators.pattern("^(0|[1-9][0-9]*)$"),
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
        ])
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void { 
    this.submitted = true;
    this.errorMessage = '';
    if (this.form.invalid) {
      return;
    }

    this.user.register(this.form.value).pipe().subscribe(() => (
      this.router.navigateByUrl('/login')
    ));
  }

}
