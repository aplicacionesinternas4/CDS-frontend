import {Servicio} from "./Servicio";
import {Tema} from "./Tema";
import {Ciudad} from "./Ciudad";
/**
 * Created by Dixon Medina on 30/11/2016.
 */
export class Request{

  public servicio  : Servicio;
  public tema      : Tema;
  public asesor    : string;
  public ciudad    : Ciudad;
  public telefono  : string;
  public movil     : string;
  public contactar : string;
  public descripcion : string;

  constructor(servicio, tema, asesor, ciudad, telefono, movil, contactar, descripcion){
    this.servicio = servicio;
    this.tema = tema;
    this.asesor = asesor;
    this.ciudad = ciudad;
    this.telefono = telefono;
    this.movil = movil;
    this.contactar = contactar;
    this.descripcion = descripcion;
  }
}

