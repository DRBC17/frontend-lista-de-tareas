import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestorePassword } from 'src/app/models/restore-password';
import { AuthService } from 'src/app/services/auth.service';
import { expand } from '../../animations/app.animation';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
  animations: [expand()],
})
export class RestorePasswordComponent implements OnInit {
  restorePasswordForm: FormGroup;

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
    this.restorePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  onSubmit(formValue: RestorePassword) {
    const user: RestorePassword = {
      email: formValue.email,
    };
    this.authService.restorePassword(user).subscribe(
      (res) => {
        this.toastr.success(res.message, 'Mensaje');
        this.router.navigate(['/signin']);
      },
      (err) => {
        const message = err.error.message;
        this.toastr.error(`${message}`, 'Alerta');
      }
    );
    return false;
  }
}
