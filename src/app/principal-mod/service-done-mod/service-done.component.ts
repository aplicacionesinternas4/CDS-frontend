import { Component, OnInit } from '@angular/core';
import {ServicioPrestado} from "../../model/ServicioPrestado";

@Component({
  selector: 'app-service-done',
  templateUrl: './service-done.component.html',
  styleUrls: ['./service-done.component.css']
})
export class ServiceDoneComponent implements OnInit {

  orientation: string = "horizontal";

  constructor() { }

  ngOnInit() {
  }

}
