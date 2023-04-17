import {Injectable} from "@angular/core";
import {HttpHelisa} from "../app.http.helisa";
import {environment} from "../../../environments/environment";
import {Ciudad} from "../../model/Ciudad";
import {Pais} from "../../model/Pais";//05-04-2018ys
import {Departamento} from "../../model/Departamento";
import {Response} from "@angular/http";
import { CiudadEdit } from "../../model/CiudadEditCompany";
/**
 * Created by Dixon Medina on 29/11/2016.
 */
@Injectable()
export class CiudadService{
  constructor(private http : HttpHelisa){
  }

  getCiudades(){
    return this.http.get(this.getCiudadesUrl(), {withCredentials : true}).map(
      (data : Response ) => data.json()._embedded.ciudads.map(
          json => new Ciudad(json.id, json.nombre, new Departamento(json.departamento.idDepartamento,json.departamento.nombre), json._links.self.href)      
        )
    )
  }

  getCiudadesEdit(){
    return this.http.get(this.getCiudadesUrl(), {withCredentials : true}).map(
      (data : Response ) => data.json()._embedded.ciudads.map(
          json => new CiudadEdit(json.id, json.nombre, new Departamento(json.departamento.idDepartamento,json.departamento.nombre), json._links.self.href)          
        )
    )
  }

  getCiudadesByIdCountry(idCountry){//validacion ciudades por pais ys 23-04-2018
    return this.http.get(this.getUrlCiudadesByIdCountry(idCountry), {withCredentials : true}).map(
      (data : Response ) =>
         data.json()._embedded.ciudads.map(
          json => new Ciudad(json.id, json.nombre, new Departamento(json.departamento.idDepartamento,json.departamento.nombre), json._links.self.href)
          
        )
    )
  }

getUrlCiudadesByIdCountry(idCountry){
  return environment.url + '/user/paises/search/findcountryById?Id='+idCountry;//validacion ciudades por pais ys 23-04-2018
}

  getCiudadesUrl(){ 
    return environment.url + '/user/ciudads/search/getAllCities'
       
  }
}
