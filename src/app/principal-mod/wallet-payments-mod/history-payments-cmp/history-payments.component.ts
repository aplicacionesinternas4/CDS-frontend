import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {HistoryService} from "../../../shared/services/history.service";
import {Constants} from "../../../shared/Constants";


@Component({
  selector: 'app-history-payments',
  templateUrl: './history-payments.component.html',
  styleUrls: ['./history-payments.component.css']
})
export class HistoryPaymentsComponent implements OnInit {


  @Input('id') idService :number;
  public historial : Array<any>;

  emptyList = true;
  constructor(private route: ActivatedRoute,
              private router: Router, private historyService: HistoryService) { }

  ngOnInit() {
    this.historyService.getMovementsByService(Constants.getIdPayments()).subscribe(
      data=> {
        this.historial = data.json()
        if(this.historial == null || this.historial.length == 0)
          this.emptyList=true;
        else
          this.emptyList = false;
      }
    );
  }

}
