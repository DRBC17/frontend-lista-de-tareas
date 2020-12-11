import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestorePassword } from 'src/app/models/restore-password';
import { AuthService } from 'src/app/services/auth.service';
import { expand } from '../../animations/app.animation';

@Component({
  selector: 'app-restore-password-token',
  templateUrl: './restore-password-token.component.html',
  styleUrls: ['./restore-password-token.component.scss'],
  animations: [expand()],
})
export class RestorePasswordTokenComponent implements OnInit {
  restorePasswordTokenForm: FormGroup;
  verified: boolean;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.verified = false;
  }

  ngOnInit(): void {
    this.verifyToken();
  }

  passwordPattern = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,26}$/;

  private buildForm() {
    this.restorePasswordTokenForm = this.formBuilder.group({
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      repeatPassword: ['', Validators.required],
    });
  }

  verifyToken() {
    const reqToken = this.activatedRoute.snapshot.params.token;

    this.authService.verifiedToken(reqToken).subscribe(
      (res) => {
        this.verified = true;
      },
      (err) => {
        this.verified = false;
        const message = err.error.message;
  
        this.toastr.info(`Debe solicitar un correo electrónico de recuperación nuevo`);
        this.toastr.error(`${message}`, 'Alerta');
        this.router.navigate(['/signin']);
      }
    );
  }

  onSubmit(formValue: RestorePassword) {
    if (formValue.password != formValue.repeatPassword)
      return this.toastr.warning('Las contraseñas deben ser iguales', 'Error');

    const reqToken = this.activatedRoute.snapshot.params.token;
    const user: RestorePassword = {
      password: formValue.password,
    };

    this.authService.changePassword(reqToken, user).subscribe(
      (res) => {
        this.toastr.success(`${res.message}`, 'Mensaje');
        this.router.navigate(['/signin']);
      },
      (err) => {
        const message = err.error.message || err.statusText;
        this.toastr.error(`${message}`, 'Alerta');
        // this.router.navigate(['/signin']);
      }
    );
  }
}
