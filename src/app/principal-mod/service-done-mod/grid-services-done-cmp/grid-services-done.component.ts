import { Component, OnInit } from '@angular/core';
import {ServicioPrestado} from "../../../model/ServicioPrestado";
//import {StartService} from "../../start-mod/start.service";
import {Movimiento} from "../../../model/Movimiento";
import {ServiceDoneService} from "../service-done.service";
import {Router, ActivatedRoute} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {MovementsServicesService} from "../../../shared/services/movements-services.service";

import {Observable} from "rxjs";
import {Ciudad} from "../../../model/Ciudad";
import {Servicio} from "../../../model/Servicio";
import {Tema} from "../../../model/Tema";
import {Request} from "../../../model/Request";
import {ServicioPrestadoService} from "../../../shared/services/servicio-prestado.service";
import {ToastService} from "../../../shared/services/toast.service";
import {Toast} from "../../../model/Toast";

@Component({
  selector: 'app-grid-services-done',
  templateUrl: './grid-services-done.component.html',
  styleUrls: ['./grid-services-done.component.css']
})
export class GridServicesDoneComponent implements OnInit {

  servicesDone : Array<ServicioPrestado> = new Array<ServicioPrestado>();
 // movimientos: Array<Movimiento> = new Array<Movimiento>();

 temas: Array<Tema> = null;
 ciudades: Array<Ciudad> = null;
 servicios: Array<Servicio> = new Array<Servicio>();
 request: Request;
 errorValidate: boolean;
 servicioPrestado : ServicioPrestado;
  user : string = '';
  Observacion : string = '';
  emptyList=false;
  loading=true;
  submit: boolean;
  validate: boolean;
  constructor(private service : ServiceDoneService, private router : Router, private route : ActivatedRoute,
    private _servicioPrestadoService: ServicioPrestadoService, private _toastService: ToastService, private _cookie : CookieService, private _movementsService: MovementsServicesService) { 
    this.servicioPrestado = new ServicioPrestado(0, "", null, null, null,"", null, null, 0, null, null, "",null, null, 0, null, null, 0, null);
    this.request = new Request(new Servicio(-1,'',0,0,0,0,0,'','',''), new Tema(-1,'',0,false,''), "", new Ciudad(-1,'',null,''), "", "", "", "");
    this.errorValidate = false;
    this.submit = false;
  }

  ngOnInit() {
   
    this.user = this._cookie.get('helisa-c-services');
    this.getServiciosDone( this.user );
  }

  getServiciosDone( user : string ){
    this.service.getServiciosDone(user);
    this.service.servicesDoneObservable.subscribe(
      (s : Array<ServicioPrestado>) => {
        this.servicesDone = s;
        this.loading=false;
        
        if(this.servicesDone == null || this.servicesDone.length==0)
          this.emptyList = true;
        else
          this.emptyList = false;
      }
    )
  }

  getServiceDone( i : number ){
    this.router.navigate(['../detail', i], {relativeTo : this.route});
  }

  changeSubmit(){
    this.submit = false;
  }
 
  
  validateRequest(requestForm) {
    this.submit = true;
  if (this.submit) {
              this.isValidServiceTheme().subscribe(
                service => {
                  let serviceTheme = parseInt(service);
                  if (serviceTheme > 0) {
                    this.submit = true;    
                  }
                  else{
                    this.submit = false;                   
                  }
                }
              );}
  }

    validateProvaide(ProvaideFrom){
      if (this.onSubmit()) {
        this.request.descripcion = "";
        this.validate = false;
      } else {
    
        
      }
  } 
  isValidServiceTheme() {
    return this._movementsService.movementsRequest(this.user, this.request.tema.getCodigo());
  }

 onSubmit() {
    let  Observacion  = "El cliente cancela la solicitud debido a que: "+this.request.descripcion;
    
    this._servicioPrestadoService.cancelservice(this.user,Observacion).subscribe(
      res=>{
        document.getElementById("closeModal").click();
        this.getServiciosDone(this.user);
       
      }
    );
 }
}
