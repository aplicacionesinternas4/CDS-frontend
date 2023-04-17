import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestServiceComponent } from './request-service.component';
import {Routes, RouterModule} from "@angular/router";
import {ServiceBarModule} from "../service-bar-mod/service-bar.module";
import {TemaService} from "../../shared/services/tema.service";
import {CiudadService} from "../../shared/services/ciudad.service";
import {ServiceService} from "../../shared/services/service.service";
import {FormsModule} from "@angular/forms";
import {ServicioPrestadoService} from "../../shared/services/servicio-prestado.service";
import {ToastModule} from "../../toast-mod/toast.module";

const routes: Routes = [
  {
    path : '', component: RequestServiceComponent,
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ServiceBarModule,
    FormsModule,
    ToastModule
  ],
  declarations: [RequestServiceComponent],
  providers: [TemaService, CiudadService, ServiceService, ServicioPrestadoService]
})
export class RequestServiceModule { }
