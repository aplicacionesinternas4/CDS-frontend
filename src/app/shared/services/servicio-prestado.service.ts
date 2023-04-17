/**
 * Created by Dixon Medina on 5/12/2016.
 */
import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";
import {Headers} from "@angular/http";
import {Response} from "@angular/http"; 
import {ServicioPrestado} from "../../model/ServicioPrestado";

@Injectable()
export class ServicioPrestadoService {
  constructor(private http: HttpHelisa){
  }

  save(servicioPrestado) {
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(this.getUrl('/user/servicioPrestadoes'), JSON.stringify(servicioPrestado), {headers: header, withCredentials : true}).subscribe(
      response  => true
    )
  }

/*cancelservice(user, Observacion ){                                      
  //let header = new Headers({'Content-type':'application/json'});
  return this.http.get(this.getUrl('/user/servicioPrestadoes/cancelService?')+'observaciones='+Observacion+'&usuarioNombre='+user).subscribe(
    res => {
     
    }

  )
    
}*/
cancelservice(user , Observacion){

  return this.http.get(environment.url+'/user/servicioPrestadoes/cancelService?conclusiones='+Observacion+'&user='+user, {withCredentials: true}).map(
    data => {
    
    }
  )
  
}

  getUrl(model : string ){
    return environment.url + model;
  }
 
}

