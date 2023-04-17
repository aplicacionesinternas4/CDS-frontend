import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {Routes, RouterModule } from '@angular/router';
import { ListBillingComponent } from './list-billing/list-billing.component';
import { BillingService } from '../../shared/services/billing.service';

const routes: Routes = [
  {
    path: '', component: ListBillingComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ListBillingComponent],
  providers: [BillingService]
})
export class HistoryBillingModule { }
