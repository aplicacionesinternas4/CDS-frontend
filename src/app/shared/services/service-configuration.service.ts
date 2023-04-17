import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import {Response} from "@angular/http";
import {environment} from "../../../environments/environment";
import {ServiceConfiguration} from "../../model/ServiceConfiguration";
import {Servicio} from "../../model/Servicio";



@Injectable()
export class ServiceConfigurationService{

  constructor(private http : HttpHelisa) {
  }


  getServiceConfiguration(idServicio:number){
    return this.http.get(this.getUrl('/user/serviceConfigurations/search/findByIdServicio?idServicio='+idServicio), {withCredentials : true}).map(
      ( response : Response ) => {
        let data =  response.json();
        let servicioData = data._embedded.servicio;

        let servicio =  new Servicio(servicioData.id, servicioData.descripcion, servicioData.precioMin, servicioData.precioMax, servicioData.tiempo, servicioData.precio,
          servicioData.por, servicioData.textSmall, servicioData.textLong, servicioData.textValue);
        return new ServiceConfiguration(data.id, data.hasIva,servicio);
      }
    );
  }

  getAllServiceConfiguration(){
    return this.http.get(this.getUrl('/user/serviceConfigurations/'), {withCredentials : true}).map(
      ( response : Response ) => {
        let data =  response.json();
        let servicioDataR = data._embedded.serviceConfigurations;
        let array: Array<ServiceConfiguration> = new Array<ServiceConfiguration>();
        for(let servicioData of servicioDataR) {
          let ss = servicioData._embedded.servicio;
          let servicio = new Servicio(ss.id, ss.descripcion, ss.precioMin, ss.precioMax, ss.tiempo, ss.precio,
            ss.por, ss.textSmall, ss.textLong, ss.textValue);
          array.push(new ServiceConfiguration(servicioData.id, servicioData.hasIva,servicio));
        }
        return array;
      }
    );
  }



  getUrl(model : string ){
    return environment.url + model;
  }
}
