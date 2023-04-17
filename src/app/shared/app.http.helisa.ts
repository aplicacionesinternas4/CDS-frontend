import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response, Request} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import {Router, NavigationExtras} from "@angular/router";
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpHelisa {

  constructor(private http: Http, private router: Router) {}

  manejarError(observable) {
    return observable.catch(
      error => {
        if(error.status == 401) {
           let navigationExtras : NavigationExtras ;
           // navigationExtras.queryParams = [URL, this.router.url]
          
           //this.router.navigate(['login',navigationExtras]);
         }
         if(error.status == 404) {
           return error;
         }
      }
    );
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.manejarError(this.http.post(url, body, options));
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.manejarError(this.http.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.manejarError(this.http.get(url, options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
    return this.manejarError(this.http.put(url, body, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.manejarError(this.http.delete(url, options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.manejarError(this.http.patch(url, body, options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.manejarError(this.http.head(url, options));
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.manejarError(this.http.options(url, options));
  }
}
