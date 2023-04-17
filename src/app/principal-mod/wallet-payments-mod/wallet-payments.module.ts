import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletPaymentsComponent } from './wallet-payments.component';
import {RouterModule, Routes} from "@angular/router";
import {HistoryPaymentsComponent} from "./history-payments-cmp/history-payments.component";
import {DebtPaymentComponent} from "./debt-payment-cmp/debt-payment.component";
import {MovementsServicesService} from "../../shared/services/movements-services.service";
import {HistoryService} from "../../shared/services/history.service";
import {UserAppService} from "../../shared/services/user-app.service";
import {ToastService} from "../../shared/services/toast.service";
import {ToastModule} from "../../toast-mod/toast.module";
import {ServiceBarModule} from "../service-bar-mod/service-bar.module";


const routes: Routes = [
  {
    path : '', component: WalletPaymentsComponent,
    children: [
      // {path: '', redirectTo: 'list'},
      // {path: 'list', component: ServiceListComponent },
      // {path: 'detail/:id', component: ServiceDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToastModule,
    ServiceBarModule
  ],
  declarations: [WalletPaymentsComponent, HistoryPaymentsComponent, DebtPaymentComponent],
  providers:[MovementsServicesService, HistoryService]
})
export class WalletPaymentsModule { }
