import {Injectable} from "@angular/core";
import {HttpHelisa} from "../app.http.helisa";
import {environment} from "../../../environments/environment";
import {Headers} from "@angular/http";
@Injectable()
export class ValidationService {

  constructor(private http : HttpHelisa) {
  }


  validateNit(nit){
    let header = new Headers({'Content-type':'application/x-www-form-urlencoded'});
    return this.http.get(this.getUrl('/user/service/validateNitCrm?nit='+nit),{withCredentials : true}).map(
      data => {
        return data.json();
      }
    )
  }

  validateLicencia(nit, licencia){
    let header = new Headers({'Content-type':'application/x-www-form-urlencoded'});
    return this.http.get(this.getUrl('/user/service/validateLicenciaCrm?nit='+nit+"&licencia="+licencia),{withCredentials : true}).map(
      data => {
        return data.json();
      }
    )
  }


  getUrl(model : string ){
    return environment.url + model;
  }

}
