import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {RouterModule, Routes} from "@angular/router";
import { EditUserComponent } from './edit-user-cmp/edit-user.component';
import {UsuarioService} from "../shared/services/usuario.service";
import {CiudadService} from "../shared/services/ciudad.service";
import {LoginService} from "../login/login.service";
import {ProfileService} from "../shared/services/profile.service";
import {UserAppService} from "../shared/services/user-app.service";
import { InfoUserComponent } from './info-user-cmp/info-user.component';
import {ToastService} from "../shared/services/toast.service";
import { EditUserAdminComponent } from './edit-user-admin/edit-user-admin.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {path: '', redirectTo: 'info'},
      //{path: 'secure', loadChildren: () => PrincipalModule},
      //{path: 'list', component: CompanyListComponent},
      //{path: 'creation-company', component: CompanyCreationComponent},
      //{path: 'info', component: InfoProfileComponent},
      {path: 'edit', component: EditUserComponent},
      {path: 'info', component: InfoUserComponent},
      {path: 'edit-Rol', component: EditUserAdminComponent}
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  	UserComponent,
    EditUserComponent,
    InfoUserComponent,
    EditUserAdminComponent
  ],
  providers:[UsuarioService,CiudadService,LoginService,ProfileService,UserAppService]
})
export class UserModule { }
