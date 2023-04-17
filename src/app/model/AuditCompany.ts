export class AuditCompany{
    constructor(
        public id_auditoria : number,
        public fechaAuditoria : string,  public usuario : string, public tipo_documento : number, public email : string, 
        public telefono : string, public celular: string, public nombre1 : string, public nombre2: string,
        public apellido1 : string, public apellido2: string,public direccion : string, public nit : string, 
        public empresa : string, public regimen : string, public id_ciudad : number, public id_pais : number,
        public id_regimen : number, public responsabilidadesCode : string, 
        public emailRetencion : string, public reteIca : string, public reteIva : string, public cityrete : string
    ){}
}