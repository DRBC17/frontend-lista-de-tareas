import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//? Módulos
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//? Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//? Servicios
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { RestorePasswordTokenComponent } from './components/restore-password-token/restore-password-token.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { SigninGuard } from './guards/signin.guard';
import { ConfirmationEmailComponent } from './components/confirmation-email/confirmation-email.component';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    TasksComponent,
    FooterComponent,
    ConfirmationComponent,
    RestorePasswordTokenComponent,
    RestorePasswordComponent,
    ConfirmationEmailComponent,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      timeOut: 8000,
      // tapToDismiss: true,
    }),
  ],
  providers: [
    AuthService,
    TaskService,
    SigninGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
