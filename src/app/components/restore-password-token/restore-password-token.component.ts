import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-restore-password-token',
  templateUrl: './restore-password-token.component.html',
  styleUrls: ['./restore-password-token.component.scss'],
})
export class RestorePasswordTokenComponent implements OnInit {
  verified: boolean;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.verified = false;
  }

  ngOnInit(): void {
    this.verifyToken();
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
        this.toastr.error(`${message}`, 'Alerta');
        this.router.navigate(['/signin']);
      }
    );
  }
}
