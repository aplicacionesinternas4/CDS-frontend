import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PrincipalModule} from "../principal-mod/principal.module";
import {FormsModule} from "@angular/forms";
import {UsuarioService} from "../shared/services/usuario.service";
import {CiudadService} from "../shared/services/ciudad.service";
import {ChangePassService} from "../change-pass/changepass.service";
import {ProfileService} from "../shared/services/profile.service";
import {UserAppService} from "../shared/services/user-app.service";
import { BillingService } from '../shared/services/billing.service';
import {ToastComponent} from "../toast-mod/toast.component";
import { ChangepassModComponent } from './changepass-mod.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
const routes: Routes = [
  {
    path: 'change', component: ChangepassModComponent  
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangepassModComponent],
  providers: [
    ChangePassService,
    CookieService,
    UsuarioService
  ]
})
export class ChangepassModModule { }
