/**
 * Created by Dixon Medina on 15/11/2016.
 */
export class Servicio{
  public id : number ;
  public descripcion : string;
  public precioMin : number;
  public precioMax : number;
  public tiempo : number;
  public precio : number;
  public por : number;
  public textSmall : string;
  public textLong : string;
  public textValue: string;
  constructor( id? : number ,  descripcion? : string,  precioMin? : number,  precioMax? : number,
               tiempo? : number,  precio? : number,  por? : number,  textSmall? : string,
               textLong? : string, textValue? : string ){
    this.id=id;
    this.descripcion=descripcion;
    this.precioMin=precioMin;
    this.precioMax=precioMax;
    this.tiempo=tiempo;
    this.precio=precio;
    this.por=por;
    this.textSmall=textSmall;
    this.textLong=textLong;
    this.textValue=textValue;
  }

  getId(){
    return parseInt(this.id+'');
  }
}
