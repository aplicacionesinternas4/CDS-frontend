import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import {Response} from "@angular/http";
import {environment} from "../../../environments/environment";
import {Setting} from "../../model/Setting";


@Injectable()
export class SettingService{

  constructor(private http : HttpHelisa) {
  }

  getSetting(name:string){
    return this.http.get(this.getUrl('/user/settings/search/findByName?name='+name), {withCredentials : true}).map(
      ( response : Response ) => {
        let data =  response.json();
        return new Setting(data.id, data.name, data.value);
      }
    );
  }

  getUrl(model : string ){
    return environment.url + model;
  }
}
