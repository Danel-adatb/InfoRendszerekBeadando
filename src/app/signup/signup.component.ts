import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { globalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,snackBarService: SnackbarService, dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(globalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(globalConstants.emailRegex)]],
      number: [null, [Validators.required, Validators.pattern(globalConstants.numberRegex)]],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      number: formData.number,
      password: formData.password
    };

    console.log(data);
  }

}
