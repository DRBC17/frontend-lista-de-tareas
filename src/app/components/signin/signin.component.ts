import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  private buildForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
    });
  }

  onSubmit(valueForm) {
    // return this.toastr.warning('Hello world!', 'Toastr fun!');

    this.toastr.success('Hello world!', 'Toastr fun!');
    // console.log(this.signupForm.value);
  }
}
