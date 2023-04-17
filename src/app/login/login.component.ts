import { Component, OnInit, ViewChild, ElementRef,Inject} from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { CookieService } from 'angular2-cookie/core';
import {UsuarioService} from "../shared/services/usuario.service";
import { DOCUMENT } from '@angular/platform-browser';
import {ToastService} from "../shared/services/toast.service";
import {Toast} from "../model/Toast";




export enum LoginType{LOGIN, SEND_EMAIL, RECOVERY, SEND_EMAIL_CONFIRMATION, PERSONAL_REGISTRATION,SEND_EMAIL_ACTIVATION,COMPANY_REGISTRATION};

@Component({
  selector: 'app-login',
    templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  //private model = {username:'soporte@helisa.com', password:'999999928'};
  @ViewChild('buttonShowPopup') buttonShowPopup:ElementRef;
  private model = {username:null, password:null};
  private recoveryModel = {username:'', oid:'', token:'', password:'', passwordConfirm:''};
  private personalRegistryModel = {name:'', lastName:'', email:'', identification:'', password:'',passwordConfirm:'',conditions:false, phone : '', typeDocument:'1'};
  private recoveryError="";
  conditionRegistryValid = true;
  loginError = false;
  loginErrorEmpty = false;
  loginErrorBlock = false;
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
  domain:string = "";
  loading = false;
  finalEmail = "";
  modalError = false;
  errorIdentification = false;
  constructor(private route: ActivatedRoute, private router  : Router, private loginService: LoginService, private cookieService: CookieService,
              private userService: UsuarioService,@Inject(DOCUMENT) private document: any, private toast: ToastService) {
                
  }

  ngAfterViewInit () {
    if(this.type == LoginType.LOGIN && this.cookieService.get('alert-message')==null) {
      this.buttonShowPopup.nativeElement.click();
      let date = new Date();
      date.setTime(date.getTime() +  5 * 60 * 60 * 1000);
      this.cookieService.put('alert-message', "true", {domain:this.domain,expires: date});
    }
  }

  extractHostname(url) {
    let hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
  }

   extractRootDomain(url) {
    let domain = this.extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;
        

    //extracting the root domain here
  /*  if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    }*/
    return domain;
}

  submit(login){
    this.domain=this.extractRootDomain( this.document.location.href);
    this.loginError=false;
    this.loginErrorEmpty=false;
    if(this.model.username!=null && this.model.password!=null && this.model.username!="" && this.model.password!="") {
      this.model.username = this.model.username.toLowerCase();
      
      this.loginService.sendLogin(this.model).subscribe(
        data => {
          this.loginService.sendDays(this.model.username).subscribe(
            datos =>{
                let days = datos.json();
                if(days >= 90){
                  this.model.username = '';
                  this.model.password = '';
                  let loginInfo = data.json();
                  let date = new Date();
                  date.setTime(date.getTime() + 100 * 24 * 60 * 60 * 1000);
                  this.cookieService.put('helisa-token', loginInfo.token, {domain:this.domain,expires: date});
                  this.cookieService.put('helisa-user', loginInfo.user, {domain:this.domain,expires: date});
                  this.cookieService.put('helisa-oid', loginInfo.oid, {domain:this.domain,expires: date});
                  this.cookieService.put('helisa-admin', loginInfo.admin ? '1' : '0', {domain:this.domain,expires: date});
                  this.router.navigate(['change']);
                }else{
                  this.model.username = '';
                  this.model.password = '';  
                  let loginInfo = data.json();
                  let date = new Date();
                  date.setTime(date.getTime() + 100 * 24 * 60 * 60 * 1000);
                  this.cookieService.put('helisa-token', loginInfo.token, {domain:this.domain,expires: date});
                  this.cookieService.put('helisa-user', loginInfo.user, {domain:this.domain,expires: date});
                  this.cookieService.put('helisa-oid', loginInfo.oid, {domain:this.domain,expires: date});
                  this.cookieService.put('helisa-admin', loginInfo.admin ? '1' : '0', {domain:this.domain,expires: date});
                  this.router.navigate(['company']);
                }
            },
            error =>{

            }
          );
        },
        error => {
          if(this.model.username != '' || this.model.username != null){
            this.loginService.sendAttempts(this.model.username).subscribe(
              data =>{
       
                let intentos =  data.json();
                if(intentos >= 3){
                  login.resetForm();
                  this.loginErrorBlock = true;
                  this.model.username = '';
                  this.model.password = '';
                }else{
                  login.resetForm();
                  this.loginError = true;
                  this.model.username = '';
                  this.model.password = '';
               }
              },
              error =>{
                login.resetForm();
                this.loginError = true;
                this.model.username = '';
                this.model.password = '';
              }
            );
            login.resetForm();
            this.loginError = true;
            this.model.username = '';
            this.model.password = '';
          }
         else{
          login.resetForm();
          this.loginError = true;
          this.model.username = '';
          this.model.password = '';
         }
        }
      );
    }else{
        this.loginErrorEmpty=true;
    }
  }



  sendRecovery() {
    if(this.recoveryModel.password!=this.recoveryModel.passwordConfirm){
      this.recoveryError = "Las contraseñas no coinciden";
    } 
    else { 
        this.recoveryError = "";
        this.loginService.sendRecovery(this.recoveryModel).subscribe(
          () => {
            
            this.refresh();
          },
          error => {
            this.recoveryError = "Ocurrio un error, intentelo de nuevo";
          }

        );  
    }
  }

  sendRecoveryEmail() {

    if(this.recoveryEmail==''){
      this.recoveryEmailError = true;
    }else {
      this.loading = true;
      this.recoveryEmail = this.recoveryEmail.toLowerCase();
      this.loginService.sendRecoveryEmail(this.recoveryEmail).subscribe(
        data => {
          this.loading = false;
          this.recoveryEmailError = data.text() == "false";
          if (!this.recoveryError)

            this.type = LoginType.SEND_EMAIL_CONFIRMATION;
        },
        error => {
          this.loading = false;
          this.recoveryEmailError = true;
        }
      )
    }
  }

  ngOnInit() {
    this.route.queryParams.forEach((params: Params) => {
      let esRecovery = params.hasOwnProperty('recovery');
      let isActivation = params.hasOwnProperty('activation');
      if(esRecovery) {
        this.type = LoginType.RECOVERY;
        this.recoveryModel.username = params['email'];
        this.recoveryModel.oid = params['oid'];
        this.recoveryModel.token = params['token'];
      }else if(isActivation){
        this.type = LoginType.LOGIN;
        let emailActivation = params['email'];
        let oid = params['oid'];
        let token = params['token'];
        this.loginService.activateUser(emailActivation, oid, token).subscribe(
          data => {

          }
        );
      }
      else
        this.type = LoginType.LOGIN;
    });

    this.userService.getDocumentsTypeRegister().subscribe(
      data =>{
        this.documentsTypes = data;
      }
    );
  }
  validateTypeDocument(typeDocument,document){
    if(typeDocument == 1 || typeDocument == 3 || typeDocument == 6){
      if(document <= 10 && document >= 8)
        return true;
      else{
        this.toast.showToast(new Toast(3, "El Documento debe tener minimo 8 caracteres y maximo 10.", true));
        return false;
      }
    }else if(typeDocument == 2){
      if(document == 9)
        return true;
      else{
        this.toast.showToast(new Toast(3, "El Nit debe tener exactamente 9 caracteres.", true));
        return false;
      }
    }else if(typeDocument == 5 || typeDocument == 8){
      if(document <= 9 )
        return true;
      else{
        this.toast.showToast(new Toast(3, "El Documento debe tener maximo 9 caracteres.", true));
        return false;
      }
    }else if(typeDocument == 7){
      if(document <= 10)
        return true;
      else{
        this.toast.showToast(new Toast(3, "El Documento debe tener minimo 10 caracteres.", true));
        return false;
      }
    }
  }
  sendPersonalRegistry(personalRegistry){
    var identificacion1 = this.personalRegistryModel.identification.toString();
    if(this.validateTypeDocument(this.personalRegistryModel.typeDocument,identificacion1.length)){
      this.loginService.validateIdentification(this.personalRegistryModel.identification).subscribe(res =>{
        if(res.text() == "true"){
          this.errorIdentification = false;
          if( this.validEmail() ) {
            this.personalRegistryModel.email = this.personalRegistryModel.email.toLowerCase();
            this.loginService.validateEmail(this.personalRegistryModel.email).subscribe(
              data => {
            
                if (data.text() == "true") {
                  this.errorEmail = false;
                  
                      if (!this.personalRegistryModel.conditions) {
                        this.conditionRegistryValid = false;
                      } else if (this.personalRegistryModel.password == this.personalRegistryModel.passwordConfirm && this.validEmail()) {
                        this.modalError = true;
                        this.loading = true;
                        this.loginService.createUser(this.personalRegistryModel).subscribe(
                          data => {
                            this.loading = false;
                            this.type = this.loginType.SEND_EMAIL_ACTIVATION;
                          }
                        );
      
                        /* TODO : Registrar en la base de datos Helisa_Pagos Table Pagos */
                        //!this.errorDocumentType
                      }
                } else {
                  this.errorEmail = true;
                  //   this.toast.showToast(new Toast(3,'Email ya registrado',false));
                }
              }
            );
          }
        } else
          this.errorIdentification = true;
      });
    }    
  }

  refresh() {
    this.router.navigate(['login']);
  }

  validEmail(){
    this.errorEmail =  !this.regexEmail.test(this.personalRegistryModel.email);
    return !this.errorEmail;
  }

  validPassword(){
    return this.regexPassword.test(this.personalRegistryModel.password);
  }

  onSelectTypeDocument(type){
    this.selectTypeDocument  = type.tipo;
    this.personalRegistryModel.typeDocument = type.codigo;
  }


  getPDF(){
    var url = this.loginService.getUrl('/login-service/pdf/') ;
    return url;
  }

}
