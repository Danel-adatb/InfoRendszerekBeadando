import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { globalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor( private formBuilder: FormBuilder, private router: Router, private userService: UserService, private dialogRef: MatDialogRef<LoginComponent>, private snackBar: SnackbarService) { }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(globalConstants.emailRegex)]],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    };

    //localStorage.setItem('token', response.token);
    this.router.navigate(['/pizza/dashboard']);
    console.log(data);
  }

}
