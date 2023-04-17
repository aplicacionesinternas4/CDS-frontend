import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherPaymentsComponent } from './other-payments.component';
import {Routes, RouterModule} from "@angular/router";
import {ServiceBarModule} from "../service-bar-mod/service-bar.module";
import { OtherServiceListComponent } from "./other-service-list-cmp/other-service-list.component";
import {ShoppingCarModule} from "../shopping-car-mod/shopping-car.module";
import {BuyServicesService} from "../buy-services-mod/buy-services.service";

const routes: Routes = [
  {
    path : '', component: OtherPaymentsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ServiceBarModule,
    ShoppingCarModule
  ],
  declarations: [OtherPaymentsComponent, OtherServiceListComponent ],
  providers:[BuyServicesService]

})
export class OtherPaymentsModule { }
