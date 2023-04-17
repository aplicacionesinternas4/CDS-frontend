export class ServicioImplementacionHoras{
  public id : number;
  public modulo : string;
  public horas : number;
  public activo : number;

  constructor(id?:number, modulo?:string, horas?:number){
    this.id=id;
    this.modulo=modulo;
    this.horas=horas;
  }
}
