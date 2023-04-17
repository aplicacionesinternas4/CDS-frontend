import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../shared/services/profile.service";
import {Router, ActivatedRoute} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Usuario} from "../../model/Usuario";
import {UserAppService} from "../../shared/services/user-app.service";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  user : string  = "null";
  userApp = null;// { name : "", lastName : "",  typeDocument : {    codigo : 0,    tipo : "" }, identification : "",  email : "",  phone : "", };

  constructor(private service : ProfileService, private router : Router, private route : ActivatedRoute,
              private cookieService : CookieService,private userAppService:UserAppService, private  loginService:LoginService) { }

  ngOnInit() {
    this.user = this.getUser();
    this.getService();
  }

  getUser(){
    return this.cookieService.get('helisa-user');
  }

  getService() {
    this.userAppService.getUserApp(this.cookieService.get('helisa-user')).subscribe(
      user =>{
        this.userApp = user;
      }
    );
  }

  goToEdit(){
    this.router.navigate(['../edit'], {relativeTo: this.route})
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
    this.router.navigate(['company/list']);
  }

}
