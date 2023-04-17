import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Servicio} from "../../../model/Servicio";
import {Location} from '@angular/common';
import {BuyServicesService} from "../buy-services.service";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  private typeDetail : number;

  orientation: string = "vertical";

  service : Servicio = new Servicio() ;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private buyService: BuyServicesService) { }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.typeDetail = params['id'];
    });
    this.buyService.showServiceDetail(true);

    this.buyService.getService(this.typeDetail).subscribe(
      (service: Servicio)=>{
        this.service = service;
      }
    );
  }

  openPopup() {
    this.router.navigate([{outlets: {popup: ['popup-buy',this.typeDetail]}}]);
  }
}
