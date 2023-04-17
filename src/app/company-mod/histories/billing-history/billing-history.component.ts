import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ProfileService} from "../../../shared/services/profile.service";
import { BillingService } from '../../../shared/services/billing.service';
import {Router, ActivatedRoute} from "@angular/router";
import { Billing } from "../../../model/Billing";
import {StartService} from "../../../principal-mod/start-mod/start.service";
import {Movimiento} from "../../../model/Movimiento";
import { detalleCompra } from '../../../model/detalleCompra';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.css']
})
export class BillingHistoryComponent implements OnInit {

  @ViewChild('buttonShowPopup') buttonShowPopup: ElementRef;
  @ViewChild('buttonHidePopup') buttonHidePopup: ElementRef;

  fileName = "";
  tableId = "historialCompras";


  movimientos: Array<Movimiento> = new Array<Movimiento>();
  detalle: Array<detalleCompra> =  new Array<detalleCompra>();
  viewerModel: Array<any> = new Array<any>();
  //vistaModel ={
  //  id_detalle:0,
  //  fecha: "",
  //  referencia: "",
  //  concepto: "",
  //  asesor:"",
  //  valorProducto:"",
  //  iva:"",
  //  reteIca:"",
  //  reteIva:"",
  //  cantidad:"",
  //  ValorTotal:""
  //}
  detalleCom: detalleCompra;
  user: String = 'null';
  campoVacio ="";
  emptyList = false;
  loading = true;
  userBilling: Billing = new Billing(null, '', '', '', '', '');
  regexEmail= new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@");


  TableInformation: Array<any>;

  constructor(private service: StartService, private router: Router,
    private route: ActivatedRoute, private cookie: CookieService, private profileService: ProfileService, private billingService: BillingService) { }

  ngOnInit() {
    this.user = this.getUser();
    this.getMovimientos(this.user);
    this.getBilling();
    //this.getDetalle();
    
  }

  getBilling(){
    this.billingService.getBilling(this.getUser()).subscribe(
      data => {
        if(data)
          this.userBilling = data;
        else
          this.buttonShowPopup.nativeElement.click();
      }
    );
  }

  getUser(){
    return this.cookie.get('helisa-c-services');
  }

  getMovimientoDetail(i : number){
    this.router.navigate(['../detail', i], {relativeTo: this.route})
  }

  getMovimientos(user : String ){
    this.service.getMovimientos(user);
    this.service.movimientosObservable.subscribe(
      async (m : Array<Movimiento>) => {
        this.movimientos = m;
        this.loading=false;
        if(this.movimientos == null || this.movimientos.length==0)
          this.emptyList = true;
        else{
          this.emptyList = false;
          await this.recolectIdMovimiento();
        }
      }
    );
  }

  async recolectIdMovimiento(){
    let ids:string="";
    for(let a of this.movimientos){
      ids += a.codigo+",";
    }
    let a = ids.slice(-1);
    if(a == ","){
      ids = ids.slice(0, -1);
    }
    await this.getDetalle(ids);
  }


  async getDetalle(movimientos){
    console.log(movimientos);
    let separator = movimientos.split(",");
    (await this.profileService.getAllDetallesByMov(movimientos)).subscribe(
      res =>{
        let responseJson = JSON.parse(res['_body']);
        for(let count of responseJson){
          this.detalle.push(JSON.parse(count));
        }
        let contador:number= 0;
        let addedList = {}
        for(let detail of this.detalle){
          for(let mov of this.movimientos){
            if(separator[contador]==detail.movimiento.codigo){
              addedList= {
                  id_detalle: detail.id,
                  fecha: detail.movimiento.fecha,
                  referencia: detail.referenciaTrans,
                  concepto: detail.movimiento.clase,
                  descripcion: detail.movimiento.servicio.descripcion,
                  asesor: detail.movimiento.empleado,
                  valorProducto: detail.valorUni,
                  iva: detail.iva,
                  reteIca: detail.valorReteIca,
                  reteIva: detail.valorReteIva,
                  cantidad: detail.cantidad,
                  valorTotal: detail.movimiento.monto
                };
              this.viewerModel.push(addedList);
              break;
            }
          }
          contador +=1;
        }
        console.log(this.viewerModel);
      }
    )
  }

  back() {
    this.router.navigate(["../company/info"]);
  }



  exportExcel() {
    /* table id is passed over here */
    let element = document.getElementById(this.tableId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
}

}
