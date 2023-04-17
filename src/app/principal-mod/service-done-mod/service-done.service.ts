import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import {ServicioPrestado} from "../../model/ServicioPrestado";
import {Subject, Observable} from "rxjs";
import {Response} from "@angular/http";
import {Tema} from "../../model/Tema";
import {Movimiento} from "../../model/Movimiento";
import {environment} from "../../../environments/environment";
/**
 * Created by Dixon Medina on 17/11/2016.
 */

@Injectable()
export class ServiceDoneService{
  servicesDone : Array<ServicioPrestado> = new Array<ServicioPrestado>();
  servicesDoneSubject : Subject<Array<ServicioPrestado>>;
  servicesDoneObservable : Observable<Array<ServicioPrestado>>;

  constructor(private http : HttpHelisa){
    this.servicesDoneSubject = new Subject<Array<ServicioPrestado>>();
    this.servicesDoneObservable = this.servicesDoneSubject.asObservable();
  }

  getServicios( user : string ){
    this.http.get(this.getUrl('/user/servicioPrestadoes/search/findByUsuarioNombreOrderByFechaRegistroDesc?usuarioNombre=')+user, {withCredentials : true}).map(
      ( response : Response ) =>  response.json()._embedded.servicioPrestadoes.map(
        json => new ServicioPrestado(json.codigo, json.usuarioNombre, json.contacto, new Date(json.fechaIni), new Date(json.fechaFin),
                                       json.observaciones, json.empleado, new Date(json.fechaRegistro), json.asesor, json.asesorPreferido,
                                       json.telefono, json.extension, json.ciudad, json.conclusiones, json.pausa,
                                       new Tema(json._embedded.tema.codigo, json._embedded.tema.nombre, json._embedded.tema.orden,
                                       json._embedded.tema.activo, this.getTemaUrl(json._embedded.tema.codigo)),                                    
                                       this.getTemaUrl(json._embedded.tema.codigo), json._embedded.movimiento.puntos, json.movil) 
                                      
      )
    ).subscribe(
      serviceDone => {
        this.servicesDone = serviceDone;
        this.servicesDoneSubject.next(this.servicesDone);
      }
    )
  }

  getServiciosDone( user : string ){
    this.http.get(this.getUrl('/user/servicioPrestadoes/search/serivicesDone?user=')+user, {withCredentials : true}).map(
      ( response : Response ) =>  response.json()._embedded.servicioPrestadoes.map( 
        json => 
          new ServicioPrestado(json.codigo, json.usuarioNombre, json.contacto, new Date(json.fechaIni), new Date(json.fechaFin),
          json.observaciones, json.asesor, new Date(json.fechaRegistro), json.estado, json.asesorPreferido,
          json.telefono, json.extension, json.ciudad, json.conclusiones, json.pausa,
          new Tema(json._embedded.tema.codigo, json._embedded.tema.nombre, json._embedded.tema.orden,
            json._embedded.tema.activo, this.getTemaUrl(json._embedded.tema.codigo)),            
            this.getTemaUrl(json._embedded.tema.codigo),
            json._embedded.movimiento==null?0:json._embedded.movimiento.puntos, json.movil)     
      )      
    ).subscribe(
      serviceDone => {
        this.servicesDone = serviceDone;
        this.servicesDoneSubject.next(this.servicesDone);
      }
    )
  }
  getTemaUrl(id){
    return environment.url+'/user/temas/'+id;
  }

  getUrl( model : string ){
    return environment.url + model;
  }

}
