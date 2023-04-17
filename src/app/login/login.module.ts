import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { LoginService } from './login.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {UsuarioService} from "../shared/services/usuario.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
  ],
  declarations: [LoginComponent],
  providers: [
    LoginService,
    CookieService,
    UsuarioService
  ]
})
export class LoginModule {
}
