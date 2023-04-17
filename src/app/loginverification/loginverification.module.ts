import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginverificationComponent} from './loginverification.component';
import { FormsModule }   from '@angular/forms';
//import { LoginService } from '../login/login.service';
import { LoginverificationService } from './loginverification.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {UsuarioService} from "../shared/services/usuario.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LoginverificationComponent],
  exports: [LoginverificationComponent],
  providers: [
    LoginverificationService,
    CookieService,
    UsuarioService
  ]
})
export class LoginverificationModule {
}
