import { Movimiento } from "./Movimiento";

export class detalleCompra{
    constructor(public id:number, public valorTotal:number, 
        public valorReteIca:number, public valorReteIva:number, 
        public descripcionPago:string, public referenciaTrans:string, 
        public movimiento:Movimiento, 
        public valorUni:number, public cantidad:number, public iva:number ){}
}