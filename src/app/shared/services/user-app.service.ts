
import {Injectable} from "@angular/core";

import {HttpHelisa} from "../app.http.helisa";
import {Response, Headers} from "@angular/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserAppService {

  constructor(private http : HttpHelisa) {
  }

  getUserApp(idUser : string){
    return this.http.get(this.getUrl('/user/userApps/search/getUserAppByIdUser?id=')+idUser, {withCredentials : true}).map(
      (response : Response ) => {
        if(response.status==200) {
          let json = response.json();
          return json;
        }
        return null;
      }
    )
  }
  getAllRoles(){
    return this.http.get(this.getUrl('/user/roles/search/getallRoles'), {withCredentials:true}).map(
      response =>{
        console.log(response);
      }
    )
  }

  save(idUser, name , lastName , email, phone , typeDocument , identification){
    let header = new Headers({'Content-type':'application/json'});
    return this.http.post(this.getUrl('/user/save-userapp'), JSON.stringify({idUser:idUser, name:name, lastName:lastName,
      email:email, phone:phone, typeDocument:typeDocument, identification:identification }),{headers: header, withCredentials : true}).map(
      (response : Response ) => {
        if(response.status==200) {
          let json = response.json();
          return json;
        }
        return null;
      }
    );
  }
  getUrl( model : string){
    return environment.url + model;
  }
}
