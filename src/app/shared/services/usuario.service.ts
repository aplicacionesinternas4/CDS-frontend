import { Injectable } from '@angular/core';
import {HttpHelisa} from "../../shared/app.http.helisa";
//import { HttpClient } from '@angular/common/http';
import {Usuario} from "../../model/Usuario";
import {Response, Headers} from "@angular/http";
import {TipoDocumento} from "../../model/TipoDocumento";
import {Pais} from "../../model/Pais";
import {Ciudad} from "../../model/Ciudad";
import {Subject, Observable} from "rxjs";
import { environment } from '../../../environments/environment';
import {Regimen} from "../../model/Regimen";
import {Departamento} from "../../model/Departamento";
import {Tema} from "../../model/Tema";
import {Roles} from '../../model/Roles';

@Injectable()
export class UsuarioService {

  paises: Array<Pais> = new Array<Pais>();
  paisesSubject : Subject<Array<Pais>>;
  paisesbservable : Observable<Array<Pais>>;

  constructor(private http : HttpHelisa,) {
    this.paisesSubject = new Subject<Array<Pais>>();
    this.paisesbservable = this.paisesSubject.asObservable();
  }

  getMinutes(id){
    return this.http.get(this.getUrl('/user/service/consultaMinutos?id=')+id,{withCredentials :true}).map(
      data=>data.text()
    );
  }



  /*getUsuario(user : string){
    return this.http.get(this.getUrl('/user/usuarios/search/findByUsuario?usuario=')+user, {withCredentials : true}).map(
      (response : Response ) => {
        if(response.status==200) {
          let json = response.json();
          return new Usuario(json.usuario, new TipoDocumento(json._embedded.tipoDocumento.codigo, json._embedded.tipoDocumento.tipo,  this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo)), json.email,
            json.telefono, json.celular, new Date(json.fecha + ""), json.ciudadText, json.nombre1, json.nombre2, json.apellido1,
            json.apellido2, json.direccion, json.codigoPostal, json.nit, json.empresa, json.prioridad,
            //json.observacion, new Ciudad(json._embedded.ciudad.id, json._embedded.ciudad.nombre, new Departamento(json._embedded.ciudad.departamento.idDepartamento,json._embedded.ciudad.departamento.nombre),this.getCiudadUrl(json._embedded.ciudad.id)),
            json.observacion, new Ciudad(json._embedded.ciudad.id, json._embedded.ciudad.nombre, new Departamento(json._embedded.ciudad.departamento.idDepartamento,json._embedded.ciudad.departamento.nombre),
            //new Pais(json._embedded.departamento.pais.id,json._embedded.departamento.pais.nombre, this.getPaisUrl(json._embedded.pais.id)),//ys23-04-2018
            this.getCiudadUrl(json._embedded.ciudad.id)),//ys 23-04-2018
            new Pais(json._embedded.pais.id, json._embedded.pais.nombre, this.getPaisUrl(json._embedded.pais.id)),
            this.getCiudadUrl(json._embedded.pais.id), this.getPaisUrl(json._embedded.pais.id),
            new Regimen(json._embedded.regimen.id, json._embedded.regimen.nombre, this.getRegimenUrl(json._embedded.regimen.id)),
            this.getRegimenUrl(json._embedded.regimen.id), this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo))
        }else return null;
      }
    )
  }*/

  getUsuario(user : string){
    return this.http.get(this.getUrl('/user/usuarios/search/findByUsuario?usuario=')+user, {withCredentials : true}).map(
      (response : Response ) => {
        if(response.status==200) {
          let json = response.json();
          return new Usuario(json.usuario, new TipoDocumento(json._embedded.tipoDocumento.codigo, json._embedded.tipoDocumento.tipo,  this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo)), json.email,
            json.telefono, json.celular, new Date(json.fecha + ""), json.ciudadText, json.nombre1, json.nombre2, json.apellido1,
            json.apellido2, json.direccion, json.codigoPostal, json.nit, json.empresa, json.prioridad,
            //json.observacion, new Ciudad(json._embedded.ciudad.id, json._embedded.ciudad.nombre, new Departamento(json._embedded.ciudad.departamento.idDepartamento,json._embedded.ciudad.departamento.nombre),this.getCiudadUrl(json._embedded.ciudad.id)),
            json.observacion, new Ciudad(json._embedded.ciudad.id, json._embedded.ciudad.nombre, new Departamento(json._embedded.ciudad.departamento.idDepartamento,json._embedded.ciudad.departamento.nombre),
            //new Pais(json._embedded.departamento.pais.id,json._embedded.departamento.pais.nombre, this.getPaisUrl(json._embedded.pais.id)),//ys23-04-2018
            this.getCiudadUrl(json._embedded.ciudad.id)),//ys 23-04-2018
            new Pais(json._embedded.pais.id, json._embedded.pais.nombre, this.getPaisUrl(json._embedded.pais.id)),
            this.getCiudadUrl(json._embedded.pais.id), this.getPaisUrl(json._embedded.pais.id),
            new Regimen(json._embedded.regimen.id, json._embedded.regimen.nombre, this.getRegimenUrl(json._embedded.regimen.id)),
            this.getRegimenUrl(json._embedded.regimen.id), this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo),json.responsabilidadesCode, json.emailretencion, json.reteIca, json.reteIva, json.cityrete)
        }else return null;
      }
    )
  }

  getDocumentsType(){
    return this.http.get(this.getUrl('/user/tipoDocumentoes'),{withCredentials:true}).map(
      (response : Response ) =>
        response.json()._embedded.tipoDocumentoes.map(
          json => new TipoDocumento(json.codigo, json.tipo, json._links.self.href)
        )
    )
  }

  getRolUser(){
    return this.http.get(this.getUrl('/Roles'), {withCredentials:true}).map(
      data=> 
      data.json().map(
        json => new Roles(json.id, json.name)
      )
    );
  }
  validateUser(email, identification){
   var model={
     "email": email, 
     "identification":identification
   };
   let header = new Headers({'Content-type': 'application/json'});
    return this.http.post(this.getUrl('/validateUserEmail'), JSON.stringify(model),{headers: header, withCredentials : true}).map(
      (response:Response)=>{
        return response;
      }
    )
    }

  saveEditRol(model){
    let header = new Headers({'Content-type': 'application/json'});
    return this.http.post(this.getUrl('/editRol'), JSON.stringify(model),{headers: header, withCredentials : true}).map(
      (response:Response)=>{
        return response;
      }
    );
  }


  getTemas(){
    return this.http.get(this.getTemasUrl(), {withCredentials : true}).map(
      (response : Response ) =>
      response.json()._embedded.temas.map(
        json => new Tema(json.codigo, json.nombre , json.order , json.activo, json._links.self.href)
      )
    )
  }
  getTemasUrl(){
    return environment.url + '/getalltemasactives'; /*22/03/2018ys nuevo servicio temas solo activos*/
  }

  getDocumentsTypeRegister(){
    return this.http.get(this.getUrl('/documents-type'),{withCredentials:true}).map(
      data=>{
        return data.json();
      }
    );
  }

  getTipoDocumentoUrl(id) {
    return environment.url+'/user/tipoDocumentoes/'+id;
  }

  createCompany(model){
    console.log(model)
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(environment.url+"/user/save-company", JSON.stringify(model), {withCredentials : true,headers: header});
  }

  getRegimenUrl(id){
    return environment.url+'/user/regimens/'+id;
  }

  getPaisUrl(id) {
    return environment.url+'/user/paises/'+id;
  }

  getCiudadUrl(id) {
    return environment.url+'/user/ciudads/'+id;
  }

  getUrl( model : string){
    return environment.url + model;
  }

  //uploadFile(data): Observable<File> {
  //  return this._http2.put<File>(environment.url + '/user/uploadFile', data);
  //}

  uploadFiles(data){
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(environment.url + '/user/uploadFile', JSON.stringify(data), {withCredentials : true,headers: header});
  }
//createCompany(model){
//  let header = new Headers({'Content-type':'application/json'});
//  return this.http.post(environment.url+"/user/save-company", JSON.stringify(model), {withCredentials : true,headers: header});
//}

}
