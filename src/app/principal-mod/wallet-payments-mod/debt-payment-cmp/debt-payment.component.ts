import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovementsServicesService} from "../../../shared/services/movements-services.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ToastService} from "../../../shared/services/toast.service";
import {Toast} from "../../../model/Toast";

@Component({
  selector: 'app-debt-payment',
  templateUrl: './debt-payment.component.html',
  styleUrls: ['./debt-payment.component.css']
})
export class DebtPaymentComponent implements OnInit {

  @Input('id') idService :number;

  totalDebt : string = "";
  private toast = false;
  private toastMessage : string = "";
  private toastType : number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,private _service : MovementsServicesService, private _cookie : CookieService,
              private toastService : ToastService) { }

  ngOnInit() {
    this.showToast();
    var user = this._cookie.get('helisa-c-services');
    this._service.getWalletPayments(user, 9);
    this._service.onShowMinutesServicesObservable.subscribe(
      data => {
        this.totalDebt = data.get(9)+"";
      }
    );

  }

  /*onPay(){
    if(this.totalDebt == ""){
    }else if(this.totalDebt == "0"){
      this.toastService.showToast(new Toast(1, "No tiene deuda pendiente. Se realizara Abono.", true));
    }else {
      this.router.navigate([{outlets: {popup: ['popup-buy', this.idService]}}]);
    }
  }*/

  onPay(){
    
    /*if(this.totalDebt == ""){
      console.log("abonos "+this.totalDebt)
    }else*/ if(this.totalDebt == "0" || this.totalDebt == ""){
      this.toastService.showToast(new Toast(1, "No tiene deuda pendiente. Se realizara Abono.", true));
      this.router.navigate([{outlets: {popup: ['popup-buy', this.idService]}}]);//ys 23-04-2018 abonos CDS cuando estan sin deuda
    }else {
      this.router.navigate([{outlets: {popup: ['popup-buy', this.idService]}}]);
    }
  }




  showToast(){
    this.toastService.onToastObservable.subscribe(
      toast => {
        this.toast = toast.getEnabled();
        this.toastMessage = toast.getMessage();
        this.toastType = toast.getType();
      }
    )
  }
}
