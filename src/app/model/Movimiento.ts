import {Servicio} from "./Servicio";
/**
 * Created by Dixon Medina on 15/11/2016.
 * Modified by Marlon Aguirre on 19/08/2021
 */
export class Movimiento{

  constructor(public codigo : number, public usuarioNombre : string , public concepto: string,  public monto : number, public puntos : number,
              public clase : number, public fecha : Date, public empleado :string, private observacion : string, public servicio : Servicio ){

  }
}
