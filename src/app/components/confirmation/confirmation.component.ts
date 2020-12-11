import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  token: String;
  confirmation: boolean;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    Boolean: false;
  }

  ngOnInit(): void {
    this.verifyToken();
  }

  verifyToken() {
    const reqToken = this.activatedRoute.snapshot.params.token;

    this.authService.confirmationEmail(reqToken).subscribe(
      (res) => {
        this.toastr.success(`${res.message}`, 'Mensaje');
        this.router.navigate(['/signin']);
      },
      (err) => {
        const message = err.error.message || err.statusText;

        this.toastr.info(
          `Debe solicitar un correo electrónico de verificación nuevo`
        );
        this.toastr.error(`${message}`, 'Alerta');
        this.router.navigate(['/signin']);
      }
    );
  }
}
