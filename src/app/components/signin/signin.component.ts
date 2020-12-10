import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
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

  onSubmit(formValue: User) {
    const user: User = {
      email: formValue.email,
      password: formValue.password,
    };
    this.authService.signIn(user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.toastr.success(`Bienvenido`, 'Mensaje');
        this.router.navigate(['/tasks']);
      },
      (err) => {
        const message = err.error.message;
        this.toastr.error(`${message}`, 'Error');
      }
    );
    return false;
  }
}
