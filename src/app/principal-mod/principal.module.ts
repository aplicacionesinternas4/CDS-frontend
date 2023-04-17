import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import {NavigationBarComponent} from "./navigation-bar-cmp/navigation-bar.component";
import {FooterBarComponent} from "./footer-bar-cmp/footer-bar.component";
import {Routes, RouterModule} from "@angular/router";
import {StartModule} from "./start-mod/start.module";
import {BuyServicesModule} from "./buy-services-mod/buy-services.module";
import {OtherPaymentsModule} from "./other-payments-mod/other-payments.module";
import {ScheduleModule} from "./schedule-mod/schedule.module";
import {ServiceDoneModule} from "./service-done-mod/service-done.module";
import {ToolBarComponent} from "./tool-bar-cmp/tool-bar.component";
import {ShoppingCarModule} from "./shopping-car-mod/shopping-car.module";
import {StepsToPaymentModule} from "./steps-to-payment-mod/steps-to-payment.module";
import {UsuarioService} from "../shared/services/usuario.service";
import {RequestServiceModule} from "./request-service-mod/request-service.module";
import {ToastService} from "../shared/services/toast.service";
import {WalletPaymentsModule} from "./wallet-payments-mod/wallet-payments.module";
import {SettingService} from "../shared/services/setting.service";
import { BillingService } from '../shared/services/billing.service';
import {ToastModule} from "../toast-mod/toast.module";
import { HistoryBillingModule } from './history-billing-mod/history-billing.module';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
    children: [
      {path: '', redirectTo: 'start'},
      {path: 'start', loadChildren: () => StartModule},
      {path: 'buy-services' , loadChildren: () => BuyServicesModule},
      {path: 'other-services' , loadChildren: () => OtherPaymentsModule},
      {path: 'schedule' , loadChildren: () => ScheduleModule},
      {path: 'services-done' , loadChildren: () => ServiceDoneModule},
      {path: 'request' , loadChildren: () => RequestServiceModule},
      {path: 'steps-payment' , loadChildren: () => StepsToPaymentModule},
      {path: 'wallet-payments/:id', loadChildren: () => WalletPaymentsModule},
      {path: 'billings', loadChildren: () => HistoryBillingModule}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShoppingCarModule
  ],
  declarations: [PrincipalComponent,
    NavigationBarComponent,
    FooterBarComponent,
    ToolBarComponent],
 providers: [UsuarioService, ToastService, SettingService, BillingService]

})
export class PrincipalModule { }
