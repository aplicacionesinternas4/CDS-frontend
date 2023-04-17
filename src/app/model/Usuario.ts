import {TipoDocumento} from "./TipoDocumento";
import {Pais} from "./Pais";
import {Ciudad} from "./Ciudad";
import {Regimen} from "./Regimen";
/**
 * Created by Dixon Medina on 18/11/2016.
 */
export class Usuario{
  constructor(public usuario : string , public tipoDocumentoObj : TipoDocumento, public email : string, public telefono : string,
              public celular : string, public fecha : Date,
              public ciudadText : string, public nombre1 : string, public nombre2 : string, public apellido1 : string,
              public apellido2 : string, public direccion : string, public codigo_postal : string, public nit : string,
              public empresa : string, public prioridad : number, public observacion : string,
              public ciudadObj : Ciudad, public paisObj : Pais, public ciudad : string, public pais : string,
              public regimenObj : Regimen, public regimen : string, public tipoDocumento : string, public responsabilidadesCode: string, 
              public emailretencion: string, public reteica: string, public reteiva: string, public cityrete: string ){

  }
}
