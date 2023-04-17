import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginModule} from "./login/login.module";
import {LoginComponent} from "./login/login.component";
import {PopupBuyServiceComponent} from "./principal-mod/popup-buy-service-mod/popup-buy-service.component";
import {PopupBuyServiceModule} from "./principal-mod/popup-buy-service-mod/popup-buy-service.module";
import {ShoppingCarService} from "./principal-mod/shopping-car-mod/shopping-car-service";
import {CompanyModModule} from "./company-mod/company-mod.module";
import {UserModule} from "./user-mod/user.module";
import {ToastService} from "./shared/services/toast.service";
import {ToastModule} from "./toast-mod/toast.module";
import { CookieModule } from 'ngx-cookie';
import {ChangepassModModule} from "./change-pass/changepass-mod.module";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangepasswordModule } from './changepassword/changepassword.module';
import { LoginverificationModule } from './loginverification/loginverification.module';
import { LoginverificationComponent } from './loginverification/loginverification.component';




const routes: Routes = [
  {path: '', component : AppComponent,
    children:[
      {path: '', redirectTo:'login' , pathMatch: 'full'},
      {path: 'login', component: LoginComponent, pathMatch: 'full'},
      {path: 'company' , loadChildren: () => CompanyModModule},
      {path: 'user' , loadChildren: () => UserModule},
      {path: 'change' , loadChildren: () => ChangepassModModule},
      {path: 'loginverification', component: LoginverificationComponent, pathMatch: 'full'},
      //{path: 'loginverification' , loadChildren: () => LoginverificationModule}
    ]
  },
  {  path: 'popup-buy/:type',  component: PopupBuyServiceComponent,  outlet: 'popup' }
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    LoginModule,
    ToastModule,
    ChangepassModModule,
    RouterModule.forRoot(routes),
    PopupBuyServiceModule,
    CookieModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ChangepasswordModule,
    LoginverificationModule
  ],
  providers: [ShoppingCarService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
