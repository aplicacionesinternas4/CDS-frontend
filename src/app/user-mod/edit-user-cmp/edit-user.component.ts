import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ProfileService} from "../../shared/services/profile.service";
import {UserAppService} from "../../shared/services/user-app.service";
import {UsuarioService} from "../../shared/services/usuario.service";
import {ToastService} from "../../shared/services/toast.service";
import {Toast} from "../../model/Toast";
import {LoginService} from "../../login/login.service";
import {TipoDocumento} from "../../model/TipoDocumento";



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user : string  = "null";
  documentsTypes : Array<TipoDocumento>;
  regexEmail= new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
  userApp =  { name : "", lastName : "",  _embedded:{ typeDocument : {    codigo : 0,    tipo : "" } }, identification : "",  email : "",  phone : "", };
  constructor(private userService:UsuarioService, private service : ProfileService, private router : Router,
              private route : ActivatedRoute, private cookie : CookieService, private userAppService:UserAppService,
              private _toastService:ToastService,private loginService:LoginService) { }

  ngOnInit() {
  	this.getTiposDocumento();
  	this.getService();
    this.user = this.getUser();
    this.service.getProfile(this.user);
  }

  getTiposDocumento(){
  	this.userService.getDocumentsType().subscribe(
      data =>{
        this.documentsTypes = data;
      }
    );
  }

  getUser(){
    return this.cookie.get('helisa-c-services');
  }

  getService() {
  	this.userAppService.getUserApp(this.cookie.get('helisa-user')).subscribe(
  		user =>{
  			this.userApp = user;

  		}
  	);
  }

  save() {
    if(this.validEmail()) {
      this.userApp.email = this.userApp.email.toLowerCase();
      this.userAppService.save(this.cookie.get('helisa-user'), this.userApp.name, this.userApp.lastName, this.userApp.email,
        this.userApp.phone, this.userApp._embedded.typeDocument.codigo, this.userApp.identification).subscribe(
        res => {
          if (res.res == "ok") {
            this._toastService.showToast(new Toast(0, "Usuario actualizado correctamente.", true));
            this.back();
          }
          else {
            this._toastService.showToast(new Toast(3, "Error al actualizar los datos.", true));
          }

        }
      );
    }
   /* this.profile.ciudad = this.profile.ciudadObj.href;
    this.profile.pais = this.profile.paisObj.href;
    this.profile.regimen = this.profile.regimenObj.href;
    
    this.service.save(this.profile).subscribe(
      data => {
        this.router.navigate(['../info'], {relativeTo : this.route})
      }
    )*/
  }

  logout() {
    this.loginService.logout().subscribe(
      res =>{}
    );
    this.cookie.remove("helisa-token");
    this.cookie.remove("helisa-user");
    this.cookie.remove("helisa-oid");
    this.cookie.remove("helisa-admin");
    this.cookie.put("shopping-car",null);
    this.router.navigate(['login']);
  }

  back(){
    this.router.navigate(['user/info']);
  }

  validEmail(){
    return this.regexEmail.test(this.userApp.email);
  }


}
