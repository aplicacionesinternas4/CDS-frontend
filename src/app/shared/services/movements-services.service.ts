import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Headers, URLSearchParams} from "@angular/http";

@Injectable()
export class MovementsServicesService {

  serviceMap: Map<number, number>;
  public  onShowMinutesServicesObservable: Observable <Map<number, number>>;
  private onShowMinutesServicesSubject: Subject<Map<number, number>>;

  constructor(private http: HttpHelisa){
    this.serviceMap = new Map<number, number>();
    this.onShowMinutesServicesSubject = new Subject<Map<number, number>>();
    this.onShowMinutesServicesObservable = this.onShowMinutesServicesSubject.asObservable();
  }

  movementsForService(user: string, service: number) {
   
    this.http.get(this.getUrl('/user/movimientoes/search/findMovementsForService?')+'user='+user+'&service='+service, {withCredentials : true}).map(
      data => data.text()
    ).subscribe(
      data => {
        this.serviceMap.set(service, parseInt(data, 10));
        this.onShowMinutesServicesSubject.next(this.serviceMap);
      }
    )
  }
  

  movementsRequest(user: string, theme: number) {/*22-03-2018 ys validacion solo un tema por solictud */
    return this.http.get(this.getUrl('/user/movimientoes/search/findMovementsRequest?')+'user='+user, {withCredentials : true}).map(
      data => data.text()
    );
  }


  getWalletPayments(user: string, service: number){
    let header = new Headers({'Content-type': 'application/x-www-form-urlencoded'});
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('nit', user);
    this.http.post(this.getUrl('/user/service/totalPorfolioByClient'), urlSearchParams.toString(), {headers: header, withCredentials: true}).map(
      data => data.json()
    ).subscribe(
      data => {
          console.log("aquii  "+data.total);
        this.serviceMap.set(service, parseInt(data.total, 10));
        this.onShowMinutesServicesSubject.next(this.serviceMap);
      }
    );
  }

  getUrl(model : string ){
    return environment.url + model;
  }


  toHex(message) {
    let str = '', c;
    for (let i = 0; i < message.length; i++) {
      c = message.charCodeAt(i);
      str += c.toString(16);
    }
    return str;
  }

  generateSign(originalMessage, key){
    var  sjcl = require('sjcl');
    let message =this.toHex(originalMessage);
    let hmac = new sjcl.misc.hmac(sjcl.codec.hex.toBits(key), sjcl.hash.sha256);
    let signature = sjcl.codec.hex.fromBits(hmac.encrypt(sjcl.codec.hex.toBits(message)));
    return signature;
  }

}
