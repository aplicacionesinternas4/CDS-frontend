import {Injectable} from "@angular/core";
import {HttpHelisa} from "../../shared/app.http.helisa";
import {Observable, Subject} from "rxjs";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Constants} from "../../shared/Constants";


@Injectable()
export class ShoppingCarService{

  total : number = 0 ;
  listServices: Array<any> = new Array<any>();

  onShowPopupShoppingCar:Observable<boolean>;
  private onShowPopupShoppingCarSubject:Subject<boolean>=new Subject<boolean>();

  addServiceToShoppingCar:Observable<any>;
  private addServiceToShoppingCarSubject:Subject<any>=new Subject<any>();


  constructor(private http : HttpHelisa,private cookieService:CookieService){
    this.onShowPopupShoppingCar = this.onShowPopupShoppingCarSubject.asObservable();
    this.addServiceToShoppingCar = this.addServiceToShoppingCarSubject.asObservable();
    this.loadDataFromCookie();
  }

  showPopupShoppingCar(show:boolean){
    this.onShowPopupShoppingCarSubject.next(show);
  }

  addService(service: any){
    this.total += service.price;
    this.listServices.push(service);
    let date = new Date();
    date.setTime(date.getTime() + 100 * 24 * 60 * 60 * 1000);
    let jsonShoppingCar = this.cookieService.get(Constants.getNameCookieShoppingCar());
    if(jsonShoppingCar == null){
      let listServicesFromCookie :Array<any> = new Array<any>();
      listServicesFromCookie.push(service);
      this.cookieService.put(Constants.getNameCookieShoppingCar(), JSON.stringify(listServicesFromCookie),{expires :date});
    }else{
      let listServicesFromCookie :Array<any> = JSON.parse(jsonShoppingCar);
      listServicesFromCookie.push(service);
      this.cookieService.put(Constants.getNameCookieShoppingCar(), JSON.stringify(listServicesFromCookie),{expires :date});
    }
  }

  loadDataFromCookie(){
    let jsonShoppingCar = this.cookieService.get(Constants.getNameCookieShoppingCar());
    if(jsonShoppingCar!=null){
      this.listServices = JSON.parse(jsonShoppingCar);
      this.total = this.listServices.map( l=> l.price).reduce((a, b)=> a+b);
    }else{
      while(this.listServices.length>0){
        this.deleteService(0);
      }
    }
  }

  deleteService(index : number){
    this.total -= this.listServices[index].price;
    this.listServices.splice(index,1);

    if(this.listServices.length==0){
      this.cookieService.remove(Constants.getNameCookieShoppingCar());
    }else{
      let date = new Date();
      date.setTime(date.getTime() + 100 * 24 * 60 * 60 * 1000);
      this.cookieService.put(Constants.getNameCookieShoppingCar(), JSON.stringify(this.listServices),{expires :date});
    }
  }

  cleanShoppingCar(){
    for(;this.listServices.length>0;){
      this.deleteService(0);
    }
  }

  cleanShoppingCarInfoExogena(){
    for(let i : number = 0;this.listServices.length>0&&i<this.listServices.length;i++){
      if(this.listServices[i].typeService==Constants.getIdInfoExogena()) {
        this.deleteService(i);
        i=0;
      }
    }
  }

}
