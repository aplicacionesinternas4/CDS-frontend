import {Departamento} from "./Departamento";
import {Pais} from "./Pais";//05-04-2018ys
/**
 * Created by Dixon Medina on 23/11/2016.
 */
export class Ciudad{
  constructor(public id : number, public nombre : string,public departamento:Departamento, public href : string ){
  }
}
