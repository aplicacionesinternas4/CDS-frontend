import { Injectable } from '@angular/core';
import { HttpHelisa } from "../../shared/app.http.helisa";
import { Usuario } from "../../model/Usuario";
import { Response, Headers } from "@angular/http";
import { TipoDocumento } from "../../model/TipoDocumento";
import { Pais } from "../../model/Pais";
import { Ciudad } from "../../model/Ciudad";
import { Subject, Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { Regimen } from "../../model/Regimen";
import { Departamento } from "../../model/Departamento";
import { CiudadEdit } from '../../model/CiudadEditCompany';
import { detalleCompra } from '../../model/detalleCompra';
import { Movimiento } from '../../model/Movimiento';

@Injectable()
export class ProfileService {

  profileSubbject: Subject<Usuario>;
  profileObservable: Observable<Usuario>;

  detalleSubject: Subject<detalleCompra>;
  detalleObservable: Observable<detalleCompra>;


  _usuario: Usuario;
  _detalle: detalleCompra;
  resp: any;
  constructor(private http: HttpHelisa) {
    this.profileSubbject = new Subject<Usuario>();
    this.profileObservable = this.profileSubbject.asObservable();
  }

  get detalle(): detalleCompra {
    return this._detalle;
  }

  get profile(): Usuario {
    return this._usuario;
  }

  //getEdit(id){
  //  this.http.get(this.getUrl('/user/usuarios/search/findByUsuario?usuario=') + id, {withCredentials : true}).map(
  //    (response: Response)=>{
  //      let json = response.json();
  //      return new CiudadEdit(
  //        json.id, json.nombre, new Departamento(json._embedded.ciudad.departamento.idDepartamento,json._embedded.ciudad.departamento.nombre), 
  //        json.href
  //      )
  //    }
  //  )
  //}

  getDetalleByMovimiento(movimiento) {
    return this.http.get(environment.url + '/user/getDetallebyMovimiento?movimiento=' + movimiento, { withCredentials: true }).map(
      (response: Response) => {
        let json = response;
      }
    );
  }

  async getAllDetallesByMov(movimientos): Promise<Observable<any>> {
    return this.http.get(environment.url + '/user/getDetallebyMovimiento?movimiento=' + movimientos, { withCredentials: true })
    .map(
      (response) =>{
        console.log("XXXXxXXXXXXXxxXXXXXXxx");
        console.log(response);
        //let a = JSON.parse(res['_body']);
        //this._detalle = a;
        return response;
      }
    )
    //.map(
    //  (response: Response) => {
    //    let json = response.json();
    //    return new detalleCompra(
    //      json.id, json.valorTotal, json.valorReteIca, json.valorReteIva, json.descripcionPago, json.referenciaTrans,
    //      json.movimiento_codigo, json.valorUni, json.cantidad, json.iva);
    //  }
    //).subscribe(
    //  res=>{
    //    console.log(res);
    //    console.log("RESPUESTA ARRIBA");
    //    this._detalle = res;
    //    this.detalleSubject.next(res);
    //  }
    //)
  }



  async getProfile(user: string) {
    this.http.get(this.getUrl('/user/usuarios/search/findByUsuario?usuario=') + user, { withCredentials: true }).map(
      (response: Response) => {
        let json = response.json();
        return new Usuario(
          json.usuario,
          new TipoDocumento(json._embedded.tipoDocumento.codigo, json._embedded.tipoDocumento.tipo, this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo)),
          json.email, json.telefono, json.celular, new Date(json.fecha), json.ciudadText, json.nombre1, json.nombre2, json.apellido1,
          json.apellido2, json.direccion, json.codigoPostal, json.nit, json.empresa, json.prioridad,
          json.observacion, new Ciudad(json._embedded.ciudad.id, json._embedded.ciudad.nombre,
            new Departamento(json._embedded.ciudad.departamento.idDepartamento, json._embedded.ciudad.departamento.nombre),
            this.getCiudadUrl(json._embedded.ciudad.id)),
          new Pais(json._embedded.pais.id, json._embedded.pais.nombre, this.getPaisUrl(json._embedded.pais.id)),
          this.getCiudadUrl(json._embedded.ciudad.id), this.getPaisUrl(json._embedded.pais.id),
          new Regimen(json._embedded.regimen.id, json._embedded.regimen.nombre, this.getRegimenUrl(json._embedded.regimen.id)),
          this.getRegimenUrl(json._embedded.regimen.id), this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo), json.responsabilidadesCode, json.emailretencion, json.reteica, json.reteiva, json.cityrete);
      }
    ).subscribe(
      profile => {
        this._usuario = profile;
        this.profileSubbject.next(profile);
      }
    )
  }

  getResponsibilities(user) {
    this.http.get(this.getUrl('/user/get-responsabilidades?usuario=') + user, { withCredentials: true }).map(
      (response: Response) => {
        let json = response.json();
        return json.responsabilidadesCode;
      }
    ).subscribe(
      prof => {
        this.resp = prof;
      }
    )
  }

  //getProfile(user: string){
  //  this.http.get(this.getUrl('/user/usuarios/search/findByUsuario?usuario=') + user, {withCredentials : true}).map(
  //    (response: Response ) => {
  //      let json = response.json();
  //      return new Usuario(
  //        json.usuario,
  //        new TipoDocumento(json._embedded.tipoDocumento.codigo, json._embedded.tipoDocumento.tipo, this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo)),
  //        json.email, json.telefono, json.celular, new Date(json.fecha), json.ciudadText, json.nombre1, json.nombre2, json.apellido1,
  //        json.apellido2, json.direccion, json.codigoPostal, json.nit, json.empresa, json.prioridad,
  //        json.observacion, new Ciudad(json._embedded.ciudad.id, json._embedded.ciudad.nombre,
  //        new Departamento(json._embedded.ciudad.departamento.idDepartamento,json._embedded.ciudad.departamento.nombre),
  //        this.getCiudadUrl(json._embedded.ciudad.id)),
  //        new Pais(json._embedded.pais.id, json._embedded.pais.nombre, this.getPaisUrl(json._embedded.pais.id)),
  //        this.getCiudadUrl(json._embedded.ciudad.id), this.getPaisUrl(json._embedded.pais.id),
  //        new Regimen(json._embedded.regimen.id, json._embedded.regimen.nombre, this.getRegimenUrl(json._embedded.regimen.id)),
  //        this.getRegimenUrl(json._embedded.regimen.id), this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo));
  //      }
  //  ).subscribe(
  //    profile => {
  //      
  //      this.profileSubbject.next(profile);
  //    }
  //  )
  //}

  getUserData(id) {
    this.http.get(this.getUrl('/user/usuarios/search/findByUsuario?usuario=') + id, { withCredentials: true })
  }

  getRegimenUrl(id) {
    return environment.url + '/user/regimens/' + id;
  }

  getPaisUrl(id) {
    return environment.url + '/user/paises/' + id;
  }

  getCiudadUrl(id) {
    return environment.url + '/user/ciudads/' + id;
  }

  getTipoDocumentoUrl(id) {
    return environment.url + '/user/tipoDocumentoes/' + id;
  }

  save(user) {
    let header = new Headers({ 'Content-type': 'application/json' });
    return this.http.post(this.getUrl('/user/save-usuario/'), JSON.stringify(user), { headers: header, withCredentials: true }).map(
      (response: Response) => {
        this.getProfile(user.usuario);
        return response;
      }
    )
  }

  /* get Ciudades */
  getCiudades() {
    return this.http.get(this.getUrl('/user/ciudads'), { withCredentials: true }).map(
      (response: Response) =>
        response.json()._embedded.ciudads.map(
          json =>
            new Ciudad(
              json.id, json.nombre,
              new Departamento(json.departamento.idDepartamento, json.departamento.nombre),
              //new Pais(json.pais.id,json.pais.nombre, json._links.self.href),//ys 23-04-2018
              json._links.self.href
            )
        )
    )
  }

  /* get Ciudad */
  getCiudad(id: number) {
    return this.http.get(this.getUrl('/user/ciudads/search/findById?Id=') + id, { withCredentials: true }).map(
      (response: Response) => {
        let json = response.json();
        return new Ciudad(
          json.id, json.nombre, new Departamento(json.departamento.idDepartamento, json.departamento.nombre),
          json._links.self.href
        );
      }
    )
  }

  /* get Ciudades */
  getPaises() {
    return this.http.get(this.getUrl('/user/paises'), { withCredentials: true }).map(
      (response: Response) =>
        response.json()._embedded.paises.map(
          json => new Pais(json.id, json.nombre, json._links.self.href)
        )
    )
  }

  /* get Pais */
  getPais(id: number) {
    return this.http.get(this.getUrl('/user/paises/search/findById?Id=') + id, { withCredentials: true }).map(
      (response: Response) => {
        let json = response.json();
        return new Ciudad(json.id, json.nombre, new Departamento(json.departamento.idDepartamento, json.departamento.nombre),
          json._links.self.href)
      }
    )
  }

  getRegimens() {
    return this.http.get(environment.url + '/user/regimens', { withCredentials: true }).map(
      (response: Response) =>
        response.json()._embedded.regimens.map(
          json => new Regimen(json.id, json.nombre, json._links.self.href)
        )
    )
  }

  getUrl(model: string) {
    return environment.url + model;
  }

}
