import {Component, OnInit} from '@angular/core';
import {TemaService} from "../../shared/services/tema.service";
import {Tema} from "../../model/Tema";
import {CiudadService} from "../../shared/services/ciudad.service";
import {Ciudad} from "../../model/Ciudad";
import {Servicio} from "../../model/Servicio";
import {ServiceService} from "../../shared/services/service.service";
import {Request} from "../../model/Request";
//import Alert = webdriver.Alert;
import {MovementsServicesService} from "../../shared/services/movements-services.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ServicioPrestado} from "../../model/ServicioPrestado";
import {ServicioPrestadoService} from "../../shared/services/servicio-prestado.service";
import {ToastService} from "../../shared/services/toast.service";
import {Toast} from "../../model/Toast";
import {Departamento} from "../../model/Departamento";
import {UsuarioService} from "../../shared/services/usuario.service";


@Component({
  selector: 'app-request-service',
  templateUrl: './request-service.component.html',
  styleUrls: ['./request-service.component.css']
})
export class RequestServiceComponent implements OnInit {

  orientation: string = "vertical";
  temas: Array<Tema> = null;
  ciudades: Array<Ciudad> = null;
  servicios: Array<Servicio> = new Array<Servicio>();
  request: Request;

  notService: boolean;
  notTheme: boolean;
  notCity: boolean;

  submit: boolean;
  errorValidate: string;

  user: string = "";

  private toast = false;
  private toastMessage : string = "";
  private toastType : number = 0;
  validate: boolean;
  constructor(private userService: UsuarioService,private temaService: TemaService, private ciudadService: CiudadService, private servicioService: ServiceService,
              private _movementsService: MovementsServicesService, private _cookie: CookieService,
              private _servicioPrestadoService: ServicioPrestadoService, private _toastService: ToastService) {
    this.request = new Request(new Servicio(-1,'',0,0,0,0,0,'','',''), new Tema(-1,'',0,false,''), "", new Ciudad(-1,'',null,''), "", "", "", "");
    this.notService = true;
    this.notTheme = true;
    this.notCity = true;
    this.submit = false;
    this.errorValidate = null;
    this.validate = true;
  }



  showToast(){
    this._toastService.onToastObservable.subscribe(
      toast => {
        this.toast = toast.getEnabled();
        this.toastMessage = toast.getMessage();
        this.toastType = toast.getType();
      }
    )
  }

  ngOnInit() {
    this.showToast();
    this.getCookieUser();
    this.getTemas();
    this.getCiudades();
    this.getServicios();
  }

  getTemas() {
    this.temaService.getTemas().subscribe(
      temas => {
        this.temas = temas
      }
    )
  }

  getCiudades() {
    this.ciudadService.getCiudades().subscribe(
      ciudades => this.ciudades = ciudades 
    )
  }
  

  getServicios() {
    //this.servicioService.getServiceNotOther().subscribe(
    this.servicioService.getService(4).subscribe(
      servicios => {
        this.servicios.push(servicios)
      }
    )
    
  }

  getErrorService() {
    return this.notService ? "" : "error";
  }

  getErrorTheme() {
    return this.notTheme ? "" : "error";
  }

  getErrorCity() {
    return this.notCity ? "" : "error";
  }
  changeSubmit(){
    this.submit = false;
  }

  validateRequest(requestForm) {
    let telefono =  this.request.telefono.toString();
    let telefono2 =  this.request.movil.toString();
    var caracteres = telefono.split("");
    var caracteres2 = telefono2.split("");
    this.submit = true;
    this.errorValidate= "No se puede enviar su solicitud debio a que \n\n\n";
    if (this.request.servicio.id == -1) {
      this.errorValidate += "el campo 'Servicio' se encuentra vacio \n";
      this.submit = false;
      this.notService = false;
    }

    if (this.request.tema.codigo == -1) {
      this.errorValidate += "el campo 'Tema' se encuentra vacio \n";
      this.notTheme = false;
      this.submit = false;
    }

    if (this.request.ciudad.id == -1) {
      this.errorValidate += "el campo 'Ciudad' se encuentra vacio \n";
      this.notCity = false;
      this.submit = false;
    }
   
    if(telefono.length ==7 ){
     if(telefono2.length == 10 || telefono2 == ""){
      //if(caracteres[0] == caracteres[1] && caracteres[0] == caracteres[2] && caracteres[0] == caracteres[3] && caracteres[0] == caracteres[4] && caracteres[0] == caracteres[5] && caracteres[0] == caracteres[6] )
      //  this.errorValidate += "el número de telefono no es valido \n";     
      //  //this._toastService.showToast(new Toast(3, "Número de telefono no valido", true));
      //else{
        if (this.submit) {
          if (this.submit && !this.isValidServiceMinutes()) {
            this.submit = false;
            this.errorValidate += "no cuenta con minutos para solicitar el servicio. ";
          }
  
          if (this.submit) {
  
            this.isValidServiceTheme().subscribe(
              service => {
                let serviceTheme = parseInt(service);   
                if (serviceTheme > 0) {
                  this.submit = false;
                  this.errorValidate += "ya presenta un servicio en lista. ";/*22-03-18ys validacion una sola solicitud por cliente */                
                }
  
                /* submit */
                if (this.submit) {
                  if (!this.onSubmit()) {
                    requestForm.reset();
                    this.request = new Request(new Servicio(-1,'',0,0,0,0,0,'','',''), new Tema(-1,'',0,false,''), "", new Ciudad(-1,'',null,''), "", "", "", "");
                    //this._toastService.showToast(new Toast(0, "Su solicitud fue enviada correctamente.", true));
                    //this._toastService.showToast(new Toast(3, "Error al envia la solicitud. Por favor intente de nuevo.", true));
                    this.errorValidate = "Error al envia la solicitud. Por favor intente de nuevo.";
                    this.validate = false;
                  }
                }else {
                  this._toastService.showToast(new Toast(3, this.errorValidate, true));
                }
              }
            );
          }else this._toastService.showToast(new Toast(3, this.errorValidate, true));
        }else this._toastService.showToast(new Toast(3, this.errorValidate, true));
      //}
    }
    else{
      this.errorValidate += "* El telefono celular debe de tener 10 caracteres \n";
      this.notCity = false;
      this.submit = false;
    }
    }else {
     this.errorValidate += "* El telefono debe de tener 7 caracteres \n";
      this.notCity = false;
      this.submit = false;
    }
  }

  onSubmit() {
    let servicioPrestado: ServicioPrestado = new ServicioPrestado(0, this.user, this.request.contactar, null, null,
      this.request.descripcion, null, null, 0,
      this.request.asesor, this.request.telefono, "",
      this.request.ciudad.nombre, null, 0, this.request.tema,
      this.request.tema.href, 0, this.request.movil);


    let result = this._servicioPrestadoService.save(servicioPrestado);
    return result;

  }

  isValidServiceTheme() {
    return this._movementsService.movementsRequest(this.user, this.request.tema.getCodigo());
  }

  isValidServiceMinutes() {
    let serviceMinutes = 0;
    serviceMinutes = this._movementsService.serviceMap.get(this.request.servicio.getId());
    return serviceMinutes > 0
  }

  getCookieUser() {
    this.user = this._cookie.get("helisa-c-services");
  }


  
}
