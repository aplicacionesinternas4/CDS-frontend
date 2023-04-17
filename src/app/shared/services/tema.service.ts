import {Injectable} from "@angular/core";
import {HttpHelisa} from "../app.http.helisa";
import {environment} from "../../../environments/environment";
import {Tema} from "../../model/Tema";
/**
 * Created by Dixon Medina on 29/11/2016.
 */
@Injectable()
export class TemaService{
  constructor(private http : HttpHelisa){
  }

  getTemas(){
    return this.http.get(this.getTemasUrl(), {withCredentials : true}).map(
      data => data.json()._embedded.temas.map(
        json => new Tema(json.codigo, json.nombre , json.order , json.activo, json._links.self.href)
      )
    )
  }

  getTemasUrl(){
    return environment.url + '/user/temas/search/getalltemasactives'; /*22/03/2018ys nuevo servicio temas solo activos*/
  }
}
