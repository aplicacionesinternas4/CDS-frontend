import { Component, OnInit } from '@angular/core';
import {Servicio} from "../../../model/Servicio";
import {BuyServicesService} from "../buy-services.service";

@Component({
  selector: 'app-service-list',
  templateUrl: 'service-list.component.html',
  styleUrls: ['service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  orientation: string = "vertical";

  listServices : Array<Servicio> ;

  constructor(private buyService: BuyServicesService) { }

  ngOnInit() {
    this.buyService.showServiceDetail(false);

    this.buyService.getServiceNotOther().subscribe(
      data => {
        this.listServices = data;
      }
    );
  }

}

