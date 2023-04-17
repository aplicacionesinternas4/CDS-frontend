import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import { BillingService } from '../../../shared/services/billing.service';

@Component({
  selector: 'app-list-billing',
  templateUrl: './list-billing.component.html',
  styleUrls: ['./list-billing.component.css']
})
export class ListBillingComponent implements OnInit {

  emptyList = false;
  loading = true;
  billings: any = [];

  constructor(private cookie: CookieService, private billingService: BillingService) { }

  ngOnInit() {
    this.getBillings( );
  }

  getUser() {
    return this.cookie.get('helisa-c-services');
  }

  getURL(billing){
    return this.billingService.getUrl('/user/download/'+this.getUser()+"/"+billing.document+".pdf");
  }

  getURLXML(billing){
    return this.billingService.getUrl('/user/electronicBillings/xml/'+billing.document);
  }
/* //se agrega metodo para url a back-end
  getPDF(billing){
    return this.billingService.getUrl('/user/electronicBillings/pdf/'+billing.document+".pdf");
  }
*/
  getBillings(  ) {
    this.billingService.getBillings(this.getUser()).subscribe(
      (data) => {
        this.billings = data;
        this.loading = false;
        this.emptyList = this.billings.length === 0;
      }
    );
  }

}