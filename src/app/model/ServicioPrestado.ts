import {Tema} from "./Tema";
//import {Movimiento} from "./Movimiento";

/**
 * Created by Dixon Medina on 15/11/2016.
 */
export class ServicioPrestado{


  constructor(private codigo : number, private usuarioNombre, private contacto : string, private fechaIni : Date,
              private fechaFin : Date,  private observaciones : string, private asesor : String,
              private fechaRegistro : Date, private estado : number, private asesorPreferido : string,
              private telefono : string, private extension : string, private ciudad : string,
              private conclusiones : string, private pausa : number, private temaObj : Tema, private tema : string,
              private puntos : number, private movil : string){
  }
  constructormov(Movimiento){
  }
}
