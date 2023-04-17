import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class ServiceBarService {
  constructor(private http: HttpHelisa){
  }

  callMinutes(user) {
    return this.http.get(this.getUrl('/user/movimientoes/search/findPointForRemoteAssistens?user=')+user, {withCredentials : true}).map(
      data => {
        return data.text();

      }
    );
  }

  callService(user, service) {
    if(service==5) {
      return this.http.get(this.getUrl('/user/movimientoes/search/findMountForTechnicalVisit?user=') + user, {withCredentials: true}).map(
        data => data.text()
      );
    }
    else return this.http.get(this.getUrl('/user/movimientoes/search/findMountForImplementation?user=')+user, {withCredentials : true}).map(
       data => data.text()
    );
  }

  getUrl(model : string ){
    return environment.url + model;
  }

}
