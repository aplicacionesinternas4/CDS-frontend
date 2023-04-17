export class Formulario {

  public estado : string;
  public mensaje : string;
  public ref_pol: string;
  public estado_pol : string;
  public codigo_respuesta_pol : string;
  public riesgo : string;
  public medio_pago : string;
  public tipo_medio_pago : string;
  public cuotas : string;
  public valorPesos : string;
  public valorAdicional : string;
  public idioma: string;
  public cus: string;
  public ciclo_pse : string;
  public pse_referencia1 : string;
  public pse_referencia2 : string;
  public pse_referencia3 : string;
  public codigo_autorizacion : string;
  public fecha_procesamiento : string;

  constructor(
    public usuarioId : string,
    public descripcion: string,
    public refVenta : string,
    public moneda : string,
    public valor : string,
    public iva : string,
    public baseDevolucionIva : string,
    public firma : string,
    public emailComprador : string,
    public prueba : string,
    public url_respuesta : string,
    public url_confirmacion : string,
    public extra1 : string,
    public extra2 : string
  ){
  }

}
