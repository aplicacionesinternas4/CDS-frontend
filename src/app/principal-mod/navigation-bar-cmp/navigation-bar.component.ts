import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {UsuarioService} from '../../shared/services/usuario.service';
import {CookieService} from "angular2-cookie/services/cookies.service";
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  typeActive=2;
  noMinutes = false;
  whithMinutes = false;
  constructor(private router : Router, 
    private route : ActivatedRoute, 
    //private _service : MovementsServicesService,
    private _service : UsuarioService ,
    private _cookie : CookieService
    ) {

  }

  minutes: number = 0;
  user: string = "";

  ngOnInit() {
    document.getElementById("sinMinutos").hidden = true;
    document.getElementById("conMinutos").hidden = true;
    this.user = this._cookie.get('helisa-c-services');
    this._service.getMinutes(this.user).subscribe(
      data=>{
        this.mine(data);
      }
    )
  }

  getMinutes(){
    console.log("here")
    this.user = this._cookie.get('helisa-c-services');
    this._service.getMinutes(this.user).subscribe(
      data=>{
        console.log(data);
      }
    )
  }

  mine(data : String){
    var min: number = +data;
    if(min<15){
      document.getElementById("sinMinutos").hidden = false;
      document.getElementById("conMinutos").hidden = true;
      this.whithMinutes = false;
      this.noMinutes = true;
    }else{
      document.getElementById("sinMinutos").hidden = true;
      document.getElementById("conMinutos").hidden = false;
      this.whithMinutes = true;
      this.noMinutes = false;
    }
  }

  //getMinutes(){
  //  this.user = this._cookie.get('helisa-c-services');
  //  this._service.movementsForService(this.user, 4);
  //  this._service.onShowMinutesServicesObservable.subscribe(
  //    data => {
  //      console.log("entro aqui");
  //      this.minutes = data.get(4);
  //      console.log(this.minutes);
  //    }
  //  )
  //}

  getRequestService(){
    this.router.navigate(['request'], {relativeTo : this.route})
  }

  goToCompanies(){
    this.router.navigate(['company/list']);
  }

  //validate() {
  //  if (this.minutes < 15) {   ng-click
  //    //this.changeModal = true;
  //    document.getElementById("sinMinutos").hidden = true;
  //    document.getElementById("sinMinutos").hidden = false;
  //    console.log("minutos menores a 15: " + this.minutes);
  //  }else{
  //    //this.changeModal = false;
  //    console.log("minutos menores a 15: " + this.minutes);
  //    document.getElementById("sinMinutos").hidden = false;
  //    document.getElementById("sinMinutos").hidden = true;
  //  }
  //}

}
