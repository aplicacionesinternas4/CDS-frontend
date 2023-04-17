import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Usuario} from "../../model/Usuario";
import {ProfileService} from "../../shared/services/profile.service";
import {LoginService} from "../../login/login.service";
import { BillingService } from '../../shared/services/billing.service';
import { Billing } from "../../model/Billing";
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.css']
})
export class InfoProfileComponent implements OnInit  {

  user : string  = "null";
  profile : Usuario;
  userBilling: Billing = new Billing(null, 'Sin información', 'Sin información', 'Sin información', 'Sin información', 'Sin información');
  validationButton = true;
  enviarinfo= false;
  role: any;

  constructor(private service: ProfileService, private router: Router, private route: ActivatedRoute,private companyService: CompanyService,
              private cookieService: CookieService,private loginService: LoginService, private billingService: BillingService) { }

  ngOnInit() {
    this.user = this.getUser();
    this.service.getProfile(this.user);
    this.getService();
    this.getBilling();
    this.getProfileType();
  }

  getUser(){
    return this.cookieService.get('helisa-c-services');
  }

  getService() {
    
    this.service.profileObservable.subscribe(
      profile => {
        this.profile = profile;
      }
    );
  }

  getBilling() {
    this.billingService.getBilling(this.getUser()).subscribe(
      data =>{
        if( data )
          this.userBilling = data;
      }
    );
  }

  goToEdit(){
    this.router.navigate(['../edit'], {relativeTo: this.route})
  }

  //scorpio
  enviarAprovado(email,messages, nit, nombreEm){
    if(messages == 1){
      console.log(nombreEm);

      let message = "aprovadaInfo";
      this.companyService.enviarAprovado(email,message, nit, nombreEm).subscribe(
        data =>{
          console.log (data);
  
        }
      );
    }else if(messages == 2){
      let message = "denegadaInfo";
      this.companyService.enviarAprovado(email,message, nit, nombreEm).subscribe(
        data =>{
          console.log (data);
    }
     );
  }
}


  getProfileType(){
    this.companyService.getUserByProfile(this.cookieService.get("helisa-user")).subscribe(
      data => {
        this.role = data;
        this.role = this.role._body;
        console.log(this.role);
        if ( this.role == 2) {
          this.validationButton = true;
          this.enviarinfo =true;
        } else if (this.role == 1) {
          this.validationButton = true;
          this.enviarinfo =true;
        }else if (this.role == 3){
          this.enviarinfo=false;
          this.validationButton = false;
        }
        else
        console.log("no entro en profile ");
      }
    );
  }

  logout() {
    this.loginService.logout().subscribe(
      res =>{}
    );
    this.cookieService.remove("helisa-token");
    this.cookieService.remove("helisa-user");
    this.cookieService.remove("helisa-oid");
    this.cookieService.remove("helisa-admin");
    this.cookieService.put("shopping-car",null);
    this.router.navigate(['login']);
  }

  back(){
    this.router.navigate(['company/list']);
  }

  goToHistorialFacturation(){
    this.router.navigate(['../billingHistory'], {relativeTo: this.route});
  }

  goToHistorialChanges(){
    this.router.navigate(['../ChangeHistory'], {relativeTo: this.route});
  }
}
