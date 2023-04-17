/**
 * Created by Dixon Medina on 16/11/2016.
 */
export class Tema{
  constructor(public codigo : number, public nombre : string, public order : number, public activo : boolean, public href : string){

  }

  getCodigo(){
    return this.codigo;
  }
}
