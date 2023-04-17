import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDoneComponent } from './service-done.component';
import {Routes, RouterModule} from "@angular/router";
import {GridServicesDoneComponent} from "./grid-services-done-cmp/grid-services-done.component";
import {ServiceBarModule} from "../service-bar-mod/service-bar.module";
import {GridDetailServicesDoneComponent} from "./grid-detail-services-done-cmp/grid-detail-services-done.component";
import {ServiceDoneService} from "./service-done.service";
import {FormsModule} from "@angular/forms";
import {ServicioPrestadoService} from "../../shared/services/servicio-prestado.service";
const routes: Routes = [
  {
    path : '', component: ServiceDoneComponent,
    children: [
      {path: '', redirectTo: 'grid'},
      {path: 'grid', component: GridServicesDoneComponent},
      {path: 'detail/:id', component: GridDetailServicesDoneComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ServiceBarModule,
    FormsModule
  ],
  declarations: [ServiceDoneComponent, GridServicesDoneComponent, GridDetailServicesDoneComponent],
  providers: [ServiceDoneService,ServicioPrestadoService]
})
export class ServiceDoneModule { }
