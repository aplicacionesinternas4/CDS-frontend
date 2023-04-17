import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsToPaymentComponent } from './steps-to-payment.component';
import {RouterModule, Routes} from "@angular/router";
import { FormsModule } from '@angular/forms';
import {SettingService} from "../../shared/services/setting.service";
import {ProfileService} from "../../shared/services/profile.service";



const routes: Routes = [
  {
    path: ':id', component: StepsToPaymentComponent
  },
  {
    path: '', component: StepsToPaymentComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [StepsToPaymentComponent],
  providers:[ProfileService,SettingService]
})
export class StepsToPaymentModule { }
