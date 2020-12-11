import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import { expand } from '../../animations/app.animation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [expand()],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.verifiedLoggdIn();
  }

  verifiedLoggdIn() {
    if (this.authService.loggedIn) return this.router.navigate(['/tasks']);
  }

  emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  passwordPattern = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,26}$/;

  private buildForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      repeatPassword: ['', Validators.required],
    });
  }

  onSubmit(formValue: User) {
    if (formValue.password != formValue.repeatPassword)
      return this.toastr.error('Las contraseñas deben ser iguales', 'Alerta');

    const user: User = {
      email: formValue.email,
      password: formValue.password,
    };

    this.authService.signUp(user).subscribe(
      (res) => {
        this.toastr.success(`${res.message}`, 'Mensaje');
        this.router.navigate(['/signin']);
      },
      (err) => {
        const message = err.error.message || err.statusText;
        this.toastr.error(`${message}`, 'Alerta');
      }
    );

    // console.log(this.signupForm.value);
  }
}
