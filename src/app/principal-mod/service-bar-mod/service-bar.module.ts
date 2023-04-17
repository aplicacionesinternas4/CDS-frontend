import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceBarComponent } from './service-bar.component';
import {ServiceBarService} from "./service-bar.service";
import {HttpHelisa} from "../../shared/app.http.helisa";
import {MovementsServicesService} from "../../shared/services/movements-services.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ServiceBarComponent],
  exports:[ServiceBarComponent],
  providers: [ServiceBarService, HttpHelisa, MovementsServicesService]
})
export class ServiceBarModule { }
