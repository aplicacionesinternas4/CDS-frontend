/**
 * Created by workspace on 12/20/2016.
 */
import {Injectable} from "@angular/core";
import {HttpHelisa} from "../app.http.helisa";
import {environment} from "../../../environments/environment";
import {URLSearchParams} from "@angular/http";
/**
 * Created by Dixon Medina on 29/11/2016.
 */
@Injectable()
export class HistoryService{
  constructor(private http : HttpHelisa){
  }

  getMovementsByService(id:number){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('idService',id+"");
    return this.http.post(this.getMovementsByServiceUrl(),urlSearchParams, {withCredentials : true});
  }

  getMovementsByServiceUrl(){
    return environment.url + '/user/recurring/wallet';
  }
}
