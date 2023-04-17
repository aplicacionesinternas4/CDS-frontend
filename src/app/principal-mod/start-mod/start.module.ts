import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StartComponent } from './start.component';
import {Routes, RouterModule} from "@angular/router";
import {ServiceBarModule} from "../service-bar-mod/service-bar.module";
import {StartService} from "./start.service";
import { GridStartComponent } from './grid-start/grid-start.component';
import { GridDetailStartComponent } from './grid-detail-start/grid-detail-start.component';

const routes: Routes = [
  {
    path : '', component: StartComponent,
    children: [
      {path: '', redirectTo: 'grid'},
      {path: 'grid', component: GridStartComponent},
      {path: 'detail/:id', component: GridDetailStartComponent},
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
  declarations: [StartComponent, GridStartComponent, GridDetailStartComponent],
  providers:[StartService]

})
export class StartModule { }
