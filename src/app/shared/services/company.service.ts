import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Usuario } from "../../model/Usuario";
import { TipoDocumento } from "../../model/TipoDocumento";
import { HttpHelisa } from "../app.http.helisa";
import { AuditCompany } from '../../model/AuditCompany';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyService {

  constructor(private http: HttpHelisa) { }
  value: any;
  audt = AuditCompany;

  getAllAudit(usuario) {
    return this.http.get(environment.url + '/user/getAllAuditories?usuario=' + usuario, { withCredentials: true }).map(
      data => data.json().map(
        json => new AuditCompany(json.Id_auditoria, json.fechaAuditoria, json.us, json.tipo_documento,
          json.email, json.telefono, json.celular, json.nombre1, json.nombre2, json.apellido1, json.apellido2,
          json.direccion, json.nit, json.empresa, json.regimen, json.id_ciudad, json.id_pais, json.id_regimen,
          json.responsabilidadesCode, json.emailRetencion, json.reteIca, json.reteIva, json.cityRete)
      )
    )
  }

  getCompanies() {
    return this.http.get(environment.url + '/user/companies', { withCredentials: true }).map(
      data => data.json().map(
        json => new Usuario(json.usuario, new TipoDocumento(json.tipoDocumento.codigo, json.tipoDocumento.tipo, this.getTipoDocumentoUrl(json._embedded.tipoDocumento.codigo)), json.email,
          json.telefono, json.celular, new Date("" + json.fecha), json.ciudadText, json.nombre1, json.nombre2, json.apellido1,
          json.apellido2, json.direccion, json.codigoPostal, json.nit, json.empresa, json.prioridad,
          json.observacion, null, null, null, null, null, null, null, json.responsabilidadesCode, json.emailRetencion, json.reteica, json.reteiva, json.cityrete)
      )
    )
  }

  getUserByProfile(user: string) {
    return this.http.get(environment.url + '/user/getRol?usuario=' + user, { withCredentials: true });
  }

  getAllCompanies(paginadoMax, paginadoMin) {
    return this.http.get(environment.url + '/user/usuarios/search/getAllCompanies?max=' + paginadoMax + '&min=' + paginadoMin, { withCredentials: true }).map(
      data => data.json()._embedded.usuarios.map(
        json => new Usuario(json.usuario, new TipoDocumento(json.tipoDocumento.codigo, json.tipoDocumento.tipo, ''), json.email,
          json.telefono, json.celular, new Date("" + json.fecha), json.ciudadText, json.nombre1, json.nombre2, json.apellido1,
          json.apellido2, json.direccion, json.codigoPostal, json.nit, json.empresa, json.prioridad,
          json.observacion, null, null, null, null, null, null, null, json.responsabilidadesCode, json.emailRetencion, json.reteica, json.reteiva, json.cityrete)
      )
    )
  }

  searchByNit(nit) {
    return this.http.get(environment.url + '/user/usuarios/search/searchUserByIdentification?identification=' + nit, { withCredentials: true }).map(
      data => data.json()._embedded.usuarios.map(
        json => new Usuario(json.usuario, new TipoDocumento(json.tipoDocumento.codigo, json.tipoDocumento.tipo, ''), json.email,
          json.telefono, json.celular, new Date("" + json.fecha), json.ciudadText, json.nombre1, json.nombre2, json.apellido1,
          json.apellido2, json.direccion, json.codigoPostal, json.nit, json.empresa, json.prioridad,
          json.observacion, null, null, null, null, null, null, null, json.responsabilidadesCode, json.emailRetencion, json.reteica, json.reteiva, json.cityrete)
      )
    )
  }

  getCompaniesUser(user: string) {
    return this.http.get(environment.url + '/user/usuarios/search/getUsuariosByIdSecurity?usuario=' + user, { withCredentials: true }).map(
      data => data.json()._embedded.usuarios.map(
        json => new Usuario(json.usuario, new TipoDocumento(json.tipoDocumento.codigo, json.tipoDocumento.tipo, ''), json.email,
          json.telefono, json.celular, new Date("" + json.fecha), json.ciudadText, json.nombre1, json.nombre2, json.apellido1,
          json.apellido2, json.direccion, json.codigoPostal, json.nit, json.empresa, json.prioridad,
          json.observacion, null, null, null, null, null, null, null, json.responsabilidadesCode, json.emailRetencion, json.reteica, json.reteiva, json.cityrete)
      )
    )
  }

//scorpio
  getTipoDocumentoUrl(id) {
    return environment.url + '/user/tipoDocumentoes/' + id;
  }
  
  enviarAprovado(email:string, messages:string, nit: string, nombreEm:string){
  return this.http.get(environment.url + '/user/enviarAprovado?email=' + email + '&messages=' + messages + '&nit=' + nit + '&nombreEm=' + nombreEm, { withCredentials: true })
  }

  getResponsabilidades(responsabilidad){
  return this.http.get(environment.url + '/user/getResponsabilidad?responsabilidad=' + responsabilidad , { withCredentials: true }).map(
    data=>data.text());;
    }

}
