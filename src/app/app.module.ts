import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//? Módulos
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//? Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//? Servicios
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AuthService, TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
