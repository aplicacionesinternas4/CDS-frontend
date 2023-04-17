import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {StartService} from "../start.service";
import {Movimiento} from "../../../model/Movimiento";
import {Router, ActivatedRoute} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ProfileService} from "../../../shared/services/profile.service";
import { BillingService } from '../../../shared/services/billing.service';
import { CompanyService } from '../../../shared/services/company.service';
import { Billing } from "../../../model/Billing";
import { detalleCompra } from '../../../model/detalleCompra';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-grid-start',
  templateUrl: './grid-start.component.html',
  styleUrls: ['./grid-start.component.css']
})
export class GridStartComponent implements OnInit {

  fileName = "HisotrialTransacciones.xlsx";
  tableId = "historialCompras";

  @ViewChild('buttonResponsabilidad') buttonResponsabilidad: ElementRef;
  @ViewChild('buttonShowPopup') buttonShowPopup: ElementRef;
  @ViewChild('buttonHidePopup') buttonHidePopup: ElementRef;
  movimientos: Array<Movimiento> = new Array<Movimiento>();
  detalle: Array<detalleCompra> =  new Array<detalleCompra>();
  viewerModel: Array<any> = new Array<any>();
  user: String = 'null';

  emptyList = false;
  loading = true;
  userBilling: Billing = new Billing(null, '', '', '', '', '');
  regexEmail= new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@");
  checkedTerms = false;

  constructor(private service: StartService, private router: Router, private CompanyService: CompanyService,
    private route: ActivatedRoute, private cookie: CookieService, private profileService: ProfileService, private billingService: BillingService) { }

  ngOnInit() {
    this.user = this.getUser();
    this.getMovimientos(this.user);
    this.getBilling();
    this.getResponsabilidades();
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

  //scorpio

  getResponsabilidades(){
    this.CompanyService.getResponsabilidades(this.getUser()).subscribe(
      data => {
        if(data == "true"){
         console.log(data);
        }
        else{
        this.buttonResponsabilidad.nativeElement.click();
        console.log(data + "error")
        }
      }
    );
  }

  //scorpio

  getMovimientos(user : String ){
    this.service.getMovimientos(user);
    this.service.movimientosObservable.subscribe(
      async(m : Array<Movimiento>) => {
        this.movimientos = m;
        this.loading=false;
        if(this.movimientos == null || this.movimientos.length==0)
          this.emptyList = true;
        else
          //this.emptyList = false;
          await this.recolectIdMovimiento();
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
          console.log(count);
          console.log("Arriba count");
        }
        if(responseJson == [] || responseJson == "" || responseJson == undefined || responseJson.length == 0){
          this.emptyList = false;
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

  getMovimientoDetail(i : number){
    this.router.navigate(['../detail', i], {relativeTo: this.route})
  }

  validEmail(email){
    return this.regexEmail.test(email);
  }

  save() {
    if(this.validEmail(this.userBilling.email) && this.checkedTerms) {
        this.userBilling.company = this.getUser();
        this.billingService.saveBilling(this.userBilling).subscribe(
          data => {
            this.buttonHidePopup.nativeElement.click();
          }
        )
    }
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
