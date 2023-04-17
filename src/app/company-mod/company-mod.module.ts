import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModComponent } from './company-mod.component';
import {RouterModule, Routes} from "@angular/router";
import {CompanyListModule} from "./company-list/company-list.module";
import {CompanyListComponent} from "./company-list/company-list.component";
import {PrincipalModule} from "../principal-mod/principal.module";
import { CompanyCreationComponent } from './company-creation/company-creation.component';
import {FormsModule} from "@angular/forms";
import {UsuarioService} from "../shared/services/usuario.service";
import {CiudadService} from "../shared/services/ciudad.service";
import {LoginService} from "../login/login.service";
import {InfoProfileComponent} from "./info-profile-cmp/info-profile.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {ProfileService} from "../shared/services/profile.service";
import {UserAppService} from "../shared/services/user-app.service";
import { BillingService } from '../shared/services/billing.service';
import {ToastComponent} from "../toast-mod/toast.component";
import { FilesService } from '../shared/services/file.service';
import { HistoriesChangesComponent } from './histories/histories-changes/histories-changes.component';
import { BillingHistoryComponent } from './histories/billing-history/billing-history.component';
import {StartService} from "../principal-mod/start-mod/start.service";



const routes: Routes = [
  {
    
    path: '', component: CompanyModComponent,
    children: [
      {path: '', redirectTo: 'list'},
      {path: 'secure', loadChildren: () => PrincipalModule},
      {path: 'list', component: CompanyListComponent},
      {path: 'creation-company', component: CompanyCreationComponent},
      {path: 'info', component: InfoProfileComponent},
      {path: 'edit', component: EditProfileComponent},
      {path: 'billingHistory',component: BillingHistoryComponent},
      {path: 'ChangeHistory', component: HistoriesChangesComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CompanyListModule,
  ],
  declarations: [CompanyModComponent, CompanyCreationComponent, EditProfileComponent, InfoProfileComponent, HistoriesChangesComponent, BillingHistoryComponent],
  providers: [
    UsuarioService,
    CiudadService,
    LoginService,
    ProfileService,
    UserAppService,
    BillingService,
    FilesService,
    StartService,
  ]
})
export class CompanyModModule { }
