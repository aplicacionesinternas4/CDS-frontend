import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import {Response, URLSearchParams} from "@angular/http";
import {ServicioImplementacionHoras} from "../../model/ServicioImplementacionHoras";
import {environment} from "../../../environments/environment";

@Injectable()
export class PopupBuyService {

  constructor(private http : HttpHelisa) {
  }

  // HTTP SERVICES

  getServicioImplementacionHoras(){
    return this.http.get(this.getUrl('/user/servicioImplementacionHorases'), {withCredentials : true }).map(
      (res : Response) => {
        return  res.json()._embedded.servicioImplementacionHorases.map(
          data=>{
            return new ServicioImplementacionHoras(data.id, data.modulo, data.horas);
          }
        )
      }
    );
  }

  getCountConnectiosByServices(idService ){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('idService',idService);
    return this.http.post(this.getUrl('/user/recurring/connections'),urlSearchParams,{withCredentials : true }).map(
      (res : Response) => {
        return  res.json();
      }
    );
  }
//objectFormDataCredir = {name:null, numberCreditCard : null, mothExpiration: null,yearExpiration: null, cityCard: null, address:null, idService:null  ,idBuyer:null};
//   PaymentRecurringUtil pay = new PaymentRecurringUtil(request.getParameter("idBuyer"),
//   request.getParameter("cardNumber"), request.getParameter("expMonth"), request.getParameter("expYear"),
//   request.getParameter("cardName"), request.getParameter("addressOne"),
//   request.getParameter("addressTwo"), request.getParameter("zipCode"), request.getParameter("city"),
  sendInfoRecurringPayment(data, countConnections ,value){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('idService',data.idService);
    urlSearchParams.append('idBuyer', data.idBuyer);
    urlSearchParams.append('cardNumber', data.numberCreditCard);
    urlSearchParams.append('expMonth', data.mothExpiration);
    urlSearchParams.append('expYear', data.yearExpiration);
    urlSearchParams.append('cardName', '');
    urlSearchParams.append('addressOne', data.address);
    urlSearchParams.append('addressTwo', '');
    urlSearchParams.append('zipCode', '');
    urlSearchParams.append('city', data.cityCard);
    urlSearchParams.append('countConnections', countConnections);
    urlSearchParams.append('value',value);
    return this.http.post(this.getUrl('/user/recurring/create'),urlSearchParams,{withCredentials : true }).map(
      (res : Response) => {
        return  res;
      }
    );

  }

  cancelRecurringPayment(idService){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('idService',idService);
    return this.http.post(this.getUrl('/user/recurring/delete'),urlSearchParams,{withCredentials : true }).map(
      (res : Response) => {
        return  res;
      }
    );
  }



  getUrl(model : string ){
    return environment.url + model;
  }
}
