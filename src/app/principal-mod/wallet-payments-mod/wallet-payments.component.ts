import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-wallet-payments',
  templateUrl: './wallet-payments.component.html',
  styleUrls: ['./wallet-payments.component.css']
})
export class WalletPaymentsComponent implements OnInit {

  typeDetail: number;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.typeDetail = params['id'];
      });
  }

}
