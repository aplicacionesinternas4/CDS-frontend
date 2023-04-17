import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCarComponent } from './shopping-car.component';
import {HttpHelisa} from "../../shared/app.http.helisa";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ShoppingCarComponent],
  exports: [ShoppingCarComponent],
  providers: [HttpHelisa]
})
export class ShoppingCarModule {

}
