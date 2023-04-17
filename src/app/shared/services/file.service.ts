import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { Files } from '../../model/Files';
import { Headers, Http, ResponseType } from "@angular/http";
const httpOptions = {headers: new Headers({ 'Content-Type': 'application/json' })};

@Injectable()
export class FilesService {
    constructor(private _http: HttpClient, 
        private http: Http) {
    }

    //uploadFile(data): Observable<Files> {
    //    let header = new Headers({ 'Content-type': 'application/json' });
    //    return this._http.post<Files>(environment.url + '/user/uploadFile', data);
    //}

    uploadFiles(data): Observable<File> {
        return this._http.post<File>(environment.url + "/user/uploadFile", data, {withCredentials : true});
    }

    sendEmail(email: string, message:string, nombreE:string, id:string ,nombreC:string){
        console.log(environment.url +'/user/send_confirmation?email='+email+'&menssage='+message+'&nombreE='+nombreE+'&id='+id+'&nombreC='+nombreC);
        return this._http.get(environment.url +'/user/send_confirmation?email='+email+'&message='+message+'&nombreE='+nombreE+'&id='+id+'&nombreC='+nombreC, {withCredentials:true}).map(
          data=>{
            console.log(data);
          }
        );
      }

    //uploadFile(code, name, ): Observable<Files> {
    //    let header = new Headers({ 'Content-type': 'application/json' });
    //    return this._http.get<Files>(environment.url + '/user/uploadFile?code='+code+ '&name='+name, {withCredentials : true} );
    //}

    getDownloadFile(code, name): Observable<number>{
        return this._http.get<number>(environment.url + '/user/dowloadFile?code=' + code + '&name=' + name, {withCredentials : true});
    }

    getDownloadFileSaveAs(code): Observable<any>{
        const httpOptions ={
            responseType: 'blob' as 'json',
            withCredentials: true
        };
        return this._http.get<any>(environment.url + '/user/downloadFile?code=' + code , httpOptions) ;
    }


}