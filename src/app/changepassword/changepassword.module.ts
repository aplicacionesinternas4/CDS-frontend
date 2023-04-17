
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UsuarioService} from "../shared/services/usuario.service";
import {ChangepasswordserviceService} from "../changepassword/changepasswordservice.service";
import { ChangepasswordComponent } from './changepassword.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
const routes: Routes = [
  {
    path: 'changepassword', component: ChangepasswordComponent  
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ChangepasswordComponent],
  declarations: [ChangepasswordComponent],
  providers: [
    ChangepasswordserviceService,
    CookieService,
    UsuarioService
  ]
})
export class ChangepasswordModule { }
