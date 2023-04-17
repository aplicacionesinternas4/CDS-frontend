import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list.component';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {CompanyService} from "../../shared/services/company.service";
import {FormsModule} from "@angular/forms";
import { ChangepasswordModule } from '../../changepassword/changepassword.module';
import {LoginverificationModule} from '../../loginverification/loginverification.module';

@NgModule({
  imports: [
    CommonModule, FormsModule,ChangepasswordModule,LoginverificationModule,
  ],
  declarations: [CompanyListComponent],
  providers: [CompanyService, CookieService],
  exports: [CompanyListComponent]
})
export class CompanyListModule { }
