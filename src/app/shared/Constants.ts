export class Constants{
  private static iva:number;
  public static setIVA(iva){this.iva=iva;}
  public static getIVA():number {return this.iva;}
  public static getIdImplement():number{return 6;}
  public static getIdRemoteAssistant():number{return 4;}
  public static getIdTechnicalVisit():number{return 5;}
  public static getIdInfoExogena():number{return 7;}
  public static getIdPayments():number{return 9;}
  public static getIdHelisaCloud():number{return 10;}
  public static getNameCookieShoppingCar():string{return "shopping-car";}
  public static getNameSettingURLConfirmation():string{return "url_confirmacion";}
  public static getNameSettingPayuURL():string{return "payuUrl";}
  public static getNameSettingPayMode():string{return "mode_pay";}
  public static getNameSettingURLResponse():string{return "url_respuesta";}
  public static getNameSettingKeyPayments():string{return "key-payments";}

}
