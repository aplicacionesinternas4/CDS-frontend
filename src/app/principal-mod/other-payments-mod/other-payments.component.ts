import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-payments',
  templateUrl: './other-payments.component.html',
  styleUrls: ['./other-payments.component.css']
})
export class OtherPaymentsComponent implements OnInit {

  orientation: string = "vertical";

  constructor() { }

  ngOnInit() {
  }

}
