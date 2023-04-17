import { Component, OnInit } from '@angular/core';
import {BuyServicesService} from "../../buy-services-mod/buy-services.service";
import {Servicio} from "../../../model/Servicio";
import {Constants} from "../../../shared/Constants";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-other-service-list',
  templateUrl: 'other-service-list.component.html',
  styleUrls: ['other-service-list.component.css']
})
export class OtherServiceListComponent implements OnInit {

  listServices : Array<Servicio>=new Array<Servicio>();


  constructor(private buyService: BuyServicesService,private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.buyService.getServiceOther().subscribe(
      (data)=>{
        this.listServices = data;      
      }
    );
  }

  getLabelButton(service){
    if(service.id==Constants.getIdInfoExogena()){
      return "Comprar";
    }else if(service.id==Constants.getIdPayments()){
      return "Hacer Pago";
    }else if(service.in=Constants.getIdHelisaCloud()){
      return "Hacer Pago";
    }
  }

  goToPage(service){
    if(service.id==Constants.getIdInfoExogena()){
      this.router.navigate([{outlets: {popup: ['popup-buy',service.id]}}]);
    }else if(service.id==Constants.getIdPayments()){
      this.router.navigate(["/company/secure/wallet-payments",service.id]);
    }else if(service.in=Constants.getIdHelisaCloud()){
      this.router.navigate([{outlets: {popup: ['popup-buy',service.id]}}]);
    }
  }

}
