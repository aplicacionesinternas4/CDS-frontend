import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import { environment } from '../../environments/environment';
import { Subject, Observable } from "rxjs";  
import { HttpHelisa } from "../shared/app.http.helisa";
import {Response} from "@angular/http";

@Injectable()
export class LoginService {



    constructor(private http: Http) { }

    getUrl(name : String){
        
        return environment.url + name;
    }

    loginverification(model){
        let header = new Headers({'Content-type':'application/json'});
        
        return this.http.post(environment.url+"/login-service/loginverification", JSON.stringify(model), {headers: header}).map(
        data=>data.text()
        );
    }

    sendLogin(model){
      let header = new Headers({'Content-type':'application/json'});
      
      return this.http.post(environment.url+"/login-service", JSON.stringify(model), {headers: header});
  }
    getUsername(username){
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(environment.url+"/login-service/getUsername", username, {headers: header}).map(
      data=>data.text());;
  }


    sendRecoveryEmail(email){
        let header = new Headers({'Content-type':'application/json'});
        return this.http.post(environment.url+"/login-service/email_recovery", email, {headers: header});
    }

    sendRecovery(model){
        let header = new Headers({'Content-type':'application/json'});
        return this.http.post(environment.url+"/login-service/recovery", JSON.stringify(model), {headers: header});
    }

    createUser(model){
        let header = new Headers({'Content-type':'application/json'});
        return this.http.post(environment.url+"/login-service/creation/user", JSON.stringify(model), {headers: header});
    }

    activateUser(emailActivation, oid, token){
        let header = new Headers({'Content-type':'application/json'});
        return this.http.post(environment.url+"/login-service/activation/user",
          JSON.stringify({username:emailActivation, oid: oid , token:token }), {headers: header});
    }

    logout(){
      let header = new Headers({'Content-type':'application/json'});
      return this.http.post(environment.url+"/login-service/logout","", {withCredentials : true,headers: header});
    }
  validateEmail(email){
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(environment.url+"/validateEmail", JSON.stringify({email:email }), {withCredentials : true,headers: header});
  }
  validate_Email(email){
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(environment.url+"/validate-email", JSON.stringify({email:email }), {withCredentials : true,headers: header});
  }
  validateIdentification(identification){
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(environment.url+"/validate-identification", JSON.stringify({identification:identification }), {withCredentials : true,headers: header});
  }
  sendAttempts(username){
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(environment.url+"/login-service/attempts", username, {headers: header});
    }
    sendDays(username){
        let header = new Headers({'Content-type':'application/json'});
        return this.http.post(environment.url+"/login-service/days", username, {headers: header});
     }
  
}
