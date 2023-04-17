import {Component, OnInit, Input} from '@angular/core';
import {MovementsServicesService} from "../../shared/services/movements-services.service";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-service-bar',
  templateUrl: './service-bar.component.html',
  styleUrls: ['./service-bar.component.css']
})
export class ServiceBarComponent implements OnInit {

  @Input('orientation') orientation: string;

  minutes : number = 0;
  technicalVisit : number = 0;
  implementation : number = 0;
  wallet : number = 0;
  user : string = "";

  constructor( private _service : MovementsServicesService, private _cookie : CookieService) { }

  ngOnInit() {

    this.user = this._cookie.get('helisa-c-services');
    this._service.movementsForService(this.user, 4);
    this._service.movementsForService(this.user, 5);
    this._service.movementsForService(this.user, 6);
    this._service.getWalletPayments(this.user, 9);

    this._service.onShowMinutesServicesObservable.subscribe(
      data => {
        this.minutes = data.get(4);
        this.technicalVisit = data.get(5);
        this.implementation = data.get(6);
        this.wallet = data.get(9);
      }
    )
  }

}
