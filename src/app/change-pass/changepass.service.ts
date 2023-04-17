import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import { environment } from '../../environments/environment';
import { Subject, Observable } from "rxjs";  
import { HttpHelisa } from "../shared/app.http.helisa";
import {Response} from "@angular/http";

@Injectable()
export class ChangePassService {



    constructor(private http: Http) { }

    getUrl(name : String){
        
        return environment.url + name;
    }

    sendRecovery(model){
        let header = new Headers({'Content-type':'application/json'});
        return this.http.post(environment.url+"/login-service/mandatory_change", JSON.stringify(model), {headers: header});
    }

    logout(){
        let header = new Headers({'Content-type':'application/json'});
        return this.http.post(environment.url+"/login-service/logout","", {withCredentials : true,headers: header});
      }
 
}
