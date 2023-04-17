import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupBuyServiceComponent} from "./popup-buy-service.component";
import {HttpHelisa} from "../../shared/app.http.helisa";
import {PopupBuyService} from "./popup-buy-service.service";
import {BuyServicesService} from "../buy-services-mod/buy-services.service";
import {ShoppingCarModule} from "../shopping-car-mod/shopping-car.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ValidationService} from "../../shared/services/validation.service";
import {SettingService} from "../../shared/services/setting.service";
import {ServiceConfigurationService} from "../../shared/services/service-configuration.service";
import { ProfileService } from '../../shared/services/profile.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [PopupBuyServiceComponent],
  exports:[PopupBuyServiceComponent],
  providers:[HttpHelisa, BuyServicesService, ProfileService, PopupBuyService,ValidationService, SettingService, ServiceConfigurationService]

})
export class PopupBuyServiceModule { }
