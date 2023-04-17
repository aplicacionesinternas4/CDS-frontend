import { Component, OnInit, ViewChild, ElementRef,Inject} from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CookieService } from 'angular2-cookie/core';
import {UsuarioService} from "../shared/services/usuario.service";
import { UserAppService } from "../shared/services/user-app.service";
import { DOCUMENT } from '@angular/platform-browser';
import {ToastService} from "../shared/services/toast.service";
import {Toast} from "../model/Toast";
import swal from 'sweetalert';


export enum LoginType{LOGIN, SEND_EMAIL, RECOVERY, SEND_EMAIL_CONFIRMATION, PERSONAL_REGISTRATION,SEND_EMAIL_ACTIVATION,COMPANY_REGISTRATION};

@Component({
  selector: 'app-loginverification',
  templateUrl: './loginverification.component.html',
  styleUrls: ['./loginverification.component.css']
})


export class LoginverificationComponent implements OnInit {


  private model = {username:null, password:null};
 // private recoveryModel = {username:'', oid:'', token:'', password:'', passwordConfirm:''};
 // private recoveryError="";
  conditionRegistryValid = true;
  loginError = false;
  loginErrorEmpty = false;
  Errorcharacters = false;
  type = LoginType.LOGIN;
  loginType = LoginType;
  recoveryEmail = "";
  recoveryEmailError=false;
  regexEmail= new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@");
  regexPassword= new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$");
  errorEmail=false;
  errorDocumentType=false;
  documentsTypes : Array<any>;
  selectTypeDocument="Cédula";
  undefinedUsername: string = "Nombre del usuario desconocido";
  usernameLogin: string = this.undefinedUsername;
  domain:string = "";
  loading = false;
  finalEmail = "";
  modalError = false;
  errorIdentification = false;

  constructor(private route: ActivatedRoute, private router  : Router, private loginService: LoginService, private cookieService: CookieService) {

     }

  ngOnInit() {

    this.loginService.getUsername(this.cookieService.get("helisa-user")).subscribe(
      data => {
        console.log(data);
        if (data != null) {
          this.usernameLogin = data;
        } else {
          this.usernameLogin = this.undefinedUsername;
        }
      },
      error => {
        this.usernameLogin = this.undefinedUsername;
      }
    );
  }


  submit(login){
    this.loginError=false;
    this.loginErrorEmpty=false;
    if(this.usernameLogin!=null && this.usernameLogin!=null && this.usernameLogin!="" && this.usernameLogin!="") {
      this.usernameLogin = this.usernameLogin.toLowerCase();
      this.model.username=this.usernameLogin;
      this.loginService.loginverification(this.model).subscribe(
        data => {
          if(data == "aceptado"){
            //this.router.navigate(['changepassword']);
            document.getElementById("faragod3").click();
            document.getElementById("btn-ocultar").click();
            
          }else if(data == "acceso denegado"){
            swal("Error","Los datos son incorrectos. Por favor verifique y intentelo nuevamente","error");
          }
        console.log(data);
        },
        error => {
         
        }
      );
    }else{
        this.loginErrorEmpty=true;
    }
  }

}
