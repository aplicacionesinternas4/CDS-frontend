import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import {Response} from "@angular/http";
import {Servicio} from "../../model/Servicio";
import {environment} from "../../../environments/environment";
import {Subject, Observable} from "rxjs";
/**
 * Created by Dixon Medina on 22/11/2016.
 */
@Injectable()
export class ServiceService{


  onShowServiceDetail:Observable<boolean>;
  private onShowServiceDetailSubject:Subject<boolean  >=new Subject<boolean>();

  constructor(private http : HttpHelisa) {
    this.onShowServiceDetail = this.onShowServiceDetailSubject.asObservable();
  }

  showServiceDetail(show:boolean){
    this.onShowServiceDetailSubject.next(show);
  }

  // HTTP SERVICES

  getServices(){
    this.http.get(this.getUrl('/user/servicioses'), {withCredentials : true }).map(
      ( response : Response ) => {
        let json = response.json();
        return new Servicio(json.id, json.descripcion, json.precioMin, json.precioMax, json.tiempo, json.precio,
          json.por, json.textSmall, json.textLong, json.textValue)
      }
    )
  }

  getService(id : number){
    return this.http.get(this.getUrl('/user/servicioses/search/findById?Id=')+id, {withCredentials : true}).map(
      ( response : Response ) => {
        let json = response.json();
        return new Servicio(json.id, json.descripcion, json.precioMin, json.precioMax, json.tiempo, json.precio,
          json.por, json.textSmall, json.textLong, json.textValue)
      }
    )
  }

  getServiceOther(){
    return this.http.get(this.getUrl('/user/servicioses/search/findByOtherServices'), {withCredentials : true}).map(
      ( response : Response ) => {
        return response.json()._embedded.servicioses.map(
          data => {
            return new Servicio(data.id, data.descripcion, data.precioMin, data.precioMax, data.tiempo, data.precio,
              data.por, data.textSmall, data.textLong, data.textValue)
          }
        );
      }
    );
  }

  getServiceNotOther(){
    return this.http.get(this.getUrl('/user/servicioses/search/findByNotOtherServices'), {withCredentials : true}).map(
      ( response : Response ) => {
        return response.json()._embedded.servicioses.map(
          data => {
            return new Servicio(data.id, data.descripcion, data.precioMin, data.precioMax, data.tiempo, data.precio,
              data.por, data.textSmall, data.textLong,data.textValue)
          }
        );
      }
    )
  }


  getUrl(model : string ){
    return environment.url + model;
  }
}
