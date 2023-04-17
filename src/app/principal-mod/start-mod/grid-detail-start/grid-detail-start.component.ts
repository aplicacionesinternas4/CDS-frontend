import { Component, OnInit } from '@angular/core';
import {StartService} from "../start.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Movimiento} from "../../../model/Movimiento";

@Component({
  selector: 'app-grid-detail-start',
  templateUrl: './grid-detail-start.component.html',
  styleUrls: ['./grid-detail-start.component.css']
})
export class GridDetailStartComponent implements OnInit {

  movimiento : Movimiento;
  index : number;
  constructor(private service : StartService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.index = params['id']
    )
    this.getMovimiento(this.index);
  }

  getMovimiento(index : number ){
    if(index>this.service.movimientos.length)
      this.getGrid()
    else
      this.movimiento = this.service.movimientos[index];
  }

  getGrid(){
    this.router.navigate(['../../'], {relativeTo: this.route})
  }
}
