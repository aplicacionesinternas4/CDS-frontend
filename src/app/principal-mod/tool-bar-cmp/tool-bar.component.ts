import { Component, OnInit } from '@angular/core';
import {ShoppingCarService} from "../shopping-car-mod/shopping-car-service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Router} from "@angular/router";
import {Usuario} from "../../model/Usuario";
import {UsuarioService} from "../../shared/services/usuario.service";
import {Location} from "@angular/common";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  open : boolean = false;
  user : Usuario = null;

  constructor(private shoppingCarService : ShoppingCarService, private cookieService: CookieService, public router: Router,
              private serviceUsuario : UsuarioService, private location : Location,private loginService:LoginService) { }

  ngOnInit() {
    this.shoppingCarService.loadDataFromCookie();
    this.getUser().subscribe(
      user => this.user = user
    )
  }

  getUserId(){
    return this.cookieService.get('helisa-c-services');
  }

  getUser(){
    return this.serviceUsuario.getUsuario(this.getUserId());
  }

  getOpen(){
    this.open = !this.open;
    this.shoppingCarService.showPopupShoppingCar(this.open);
  }

  close(){

    if(this.open){
      this.open = false;
      this.shoppingCarService.showPopupShoppingCar(this.open);
    }
  }

  logout() {
    this.loginService.logout().subscribe(
      res =>{}
    );
    this.cookieService.remove("helisa-token");
    this.cookieService.remove("helisa-user");
    this.cookieService.remove("helisa-oid");
    this.cookieService.remove("helisa-admin");
    this.cookieService.put("shopping-car",null);
    this.router.navigate(['login']);
  }

  back(){
    this.location.back();
  }


  focusOutFunction(){

  }
}
