import { Component, OnInit } from '@angular/core';
import { BuyServicesService} from "./buy-services.service";

@Component({
  selector: 'app-buy-services',
  templateUrl: './buy-services.component.html',
  styleUrls: ['./buy-services.component.css']
})
export class BuyServicesComponent implements OnInit {

  private showDetail : boolean  = false;

  constructor(private buyService: BuyServicesService) {
  }

  ngOnInit() {
    this.buyService.onShowServiceDetail.subscribe(
      (showDetail : boolean) => {
        this.showDetail = showDetail;
      }
    );
  }

}
