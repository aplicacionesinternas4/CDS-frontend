import {HttpHelisa} from "../../shared/app.http.helisa";
import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Movimiento} from "../../model/Movimiento";
import {Servicio} from "../../model/Servicio";
import {Subject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
/**
 * Created by Dixon Medina on 12/11/2016.
 */

@Injectable()
export class StartService {
  movimientos: Array<Movimiento> = new Array<Movimiento>();
  movimientosSubject : Subject<Array<Movimiento>>;
  movimientosObservable : Observable<Array<Movimiento>>;

  constructor(private http: HttpHelisa) {
     this.movimientosSubject = new Subject<Array<Movimiento>>();
     this.movimientosObservable = this.movimientosSubject.asObservable();
  }

  getMovimientos(user) {
    this.http.get(this.getUrl('/user/movimientoes/search/findByUsuarioNombreOrderByFechaDesc?usuarioNombre=') + user, {withCredentials: true}).map(
      (response: Response) => response.json()._embedded.movimientoes.map( 
        json => new Movimiento(json.codigo, json.usuarioNombre, json.concepto, json.monto, json.puntos, json.clase, new Date(json.fecha+""), json.empleado, json.observacion,
          new Servicio(json.servicio.id, json.servicio.descripcion, json.servicio.precioMin,
            json.servicio.precioMax, json.servicio.tiempo, json.servicio.precio, json.servicio.por, json.servicio.textSmall, json.servicio.textLong) 
        )
      )
    ).subscribe(
      movimiento => {
        console.log(movimiento);
        console.log("here we going");
        this.movimientos = movimiento;
        this.movimientosSubject.next(this.movimientos);
      }
    )
  }

  getUrl( model : string ){
    return environment.url + model;
  }
}
