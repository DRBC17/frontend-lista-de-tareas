import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  passwordPattern = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,26}$/;

  private buildForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      // repeatpassword: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    // return this.toastr.warning('Hello world!', 'Toastr fun!');

    this.toastr.success('Hello world!', 'Toastr fun!');
    // console.log(this.signupForm.value);
  }
}
