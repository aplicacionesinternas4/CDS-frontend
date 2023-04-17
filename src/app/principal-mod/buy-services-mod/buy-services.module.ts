import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyServicesComponent } from './buy-services.component';
import {Routes, RouterModule} from "@angular/router";
import {ShoppingCarModule} from "../shopping-car-mod/shopping-car.module";
import {ServiceListComponent} from "./service-list-cmp/service-list.component";
import {ServiceBarModule} from "../service-bar-mod/service-bar.module";
import {ServiceDetailComponent} from "./service-detail-cmp/service-detail.component";
import {PopupBuyServiceModule} from "../popup-buy-service-mod/popup-buy-service.module";
import {BuyServicesService} from "./buy-services.service";

const routes: Routes = [
  {
    path : '', component: BuyServicesComponent,
    children: [
      {path: '', redirectTo: 'list'},
      {path: 'list', component: ServiceListComponent },
      {path: 'detail/:id', component: ServiceDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShoppingCarModule,
    ServiceBarModule,
    PopupBuyServiceModule
  ],
  declarations: [BuyServicesComponent,ServiceListComponent,ServiceDetailComponent],
  providers: [BuyServicesService]
})
export class BuyServicesModule { }
