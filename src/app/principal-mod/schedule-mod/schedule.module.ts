import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
  {
    path : '', component: ScheduleComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScheduleComponent]
})
export class ScheduleModule { }
