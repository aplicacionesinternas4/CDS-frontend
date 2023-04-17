import { Component, OnInit } from '@angular/core';
import {ServiceDoneService} from "../service-done.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ServicioPrestado} from "../../../model/ServicioPrestado";

@Component({
  selector: 'app-grid-detail-services-done',
  templateUrl: './grid-detail-services-done.component.html',
  styleUrls: ['./grid-detail-services-done.component.css']
})
export class GridDetailServicesDoneComponent implements OnInit {

  serviceDone : ServicioPrestado;
  index : number;

  constructor( private service : ServiceDoneService, private router : Router, private route : ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.index = params['id']
    )
    this.getServiceDone( this.index );
  }

  getServiceDone( i : number ){
    if(i > this.service.servicesDone.length )
      this.getGrid()
    else
     this.serviceDone = this.service.servicesDone[i];
  }

  getGrid(){
    this.router.navigate(['../../'], {relativeTo : this.route})
  }



}
