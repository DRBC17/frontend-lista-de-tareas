import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//? Módulos
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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

@NgModule({
  declarations: [AppComponent, NavbarComponent, SigninComponent, SignupComponent, TasksComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    AuthService,
    TaskService,
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
