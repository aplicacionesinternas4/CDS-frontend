import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ShoppingCarService } from "../shopping-car-mod/shopping-car-service";
import { Usuario } from "../../model/Usuario";
import { Pais } from "../../model/Pais";
import { Ciudad } from "../../model/Ciudad";
import { Regimen } from "../../model/Regimen";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { SettingService } from "../../shared/services/setting.service";
import { Constants } from "../../shared/Constants";
import { ProfileService } from "../../shared/services/profile.service";
import { CiudadService } from "../../shared/services/ciudad.service";
import { TipoDocumento } from "../../model/TipoDocumento";
import { UsuarioService } from "../../shared/services/usuario.service";
import { BillingService } from '../../shared/services/billing.service';
import { Departamento } from "../../model/Departamento";
import { ServiceConfigurationService } from "../../shared/services/service-configuration.service";
import { ServiceConfiguration } from "../../model/ServiceConfiguration";
import { Billing } from "../../model/Billing";
import { c } from '@angular/core/src/render3';


@Component({
  selector: 'app-steps-to-payment',
  templateUrl: './steps-to-payment.component.html',
  styleUrls: ['./steps-to-payment.component.css']
})
export class StepsToPaymentComponent implements AfterViewInit {




  IVA: number = Constants.getIVA();
  user: string = "null";
  profile: Usuario = new Usuario('', new TipoDocumento(0, '', ''), '', '', '', null, '', '', '', '', '', '', '', '', '', null,
    '', new Ciudad(0, '', new Departamento(0, ''), ''), new Pais(0, '', ''), '', '', new Regimen(0, '', ''), '', '', '', '', '', '', '');//ys 23-04-2018

  userApp = {
    usuario: "", nombre1: "", direccion: "", telefono: "", email: "", tipoDocumento: 0, ciudad: 0, pais: 0,
    regimen: 0, nit: ""
  };

  urlSendForm: string = "";
  paises: Array<Pais>;
  ciudades: Array<Ciudad>;
  regimens: Array<Regimen>;
  documentsTypes: Array<TipoDocumento>;
  md5Hex = require('md5-hex');
  userBilling: Billing = new Billing(null, '', '', '', '', '');
  compra1 = false;
  compra2 = false;
  regexEmail = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@");
  //regexEmail= new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");

  selectICa = false;
  step: number = 1;
  messagePayOnline: string = "Cargando ...";
  key: string = "";
  selectTypeDocument = "";
  selectIcaValue = "";
  datosICA = ["", ""];
  errorDocumentType = false;
  errorEmail = false;
  subtotal = 0;
  model = {
    usuarioId: 66852,
    accountId: 512321,
    descripcion: '',
    refVenta: 0,
    moneda: 'COP',
    valor: '',
    iva: '',
    baseDevolucionIva: '',
    firma: '',
    emailComprador: '',
    prueba: 1,//Cero para produccion
    url_respuesta: '',
    url_confirmacion: '',
    extra1: '',
    extra2: '',
    extra3: '',
   
  };
  checkedTerms = false;
  checkedSaveData = false;

  showErrorTerms = false;
  showErrorSaveData = false;

  constructor(private shoppingCarService: ShoppingCarService, private service: ProfileService, private router: Router,
    private route: ActivatedRoute, private cookie: CookieService, private settingService: SettingService,
    private ciudadService: CiudadService, private userService: UsuarioService,
    private serviceConfigurationService: ServiceConfigurationService, private billingService: BillingService) { }

  ngAfterViewInit() {

  }

  async ngOnInit() {
    this.user = this.getUser();
    await this.service.getProfile(this.user);

    this.getService();
    this.loadSettings();
    this.route.params.subscribe((params: Params) => {
      let param = +params['id'];
      if (param == 1) {
        this.step = 3;
        this.messagePayOnline = "Su pago fue efectuado con exito";
        this.cleanShoppingCar();
      } else if (param == 2) {
        this.step = 3;
        this.messagePayOnline = "Pendiente, Por favor revisar si el débito fue realizado en el Banco";
      } else if (param == 3) {
        this.step = 3;
        this.messagePayOnline = "Transacción rechazada";
      } else if (param == 4) {
        this.step = 3;
        this.messagePayOnline = "Transacción fallida";
      } else if (param == 5) {
        this.step = 3;
        this.messagePayOnline = "Su pago no se pudo realizar";
      }
    });
    this.getTipoDocumentos();
    this.getCiudades();
    // this.getCiudadesbydep();//26-04-2018ys
    this.getPaises();
    this.getRegimens();
    this.getBilling();
  }


  getTipoDocumentos() {
    this.userService.getDocumentsType().subscribe(
      data => {
        this.documentsTypes = data;
      }
    );
  }

  deleteService(index: number) {
    this.shoppingCarService.deleteService(index);
    this.getproducto1(0,0,0,0);
    this.getproducto2(0,0,0,0);
    this.sumatoriaTotales("");
    this.getInfoCookies();
  }

  onClickNext(form) {
    this.showErrorTerms = false;
    this.showErrorSaveData = false;
    if (!this.isDisableNextButton()) {
      if (this.step == 2) {
        if (!this.checkedSaveData)
          this.showErrorSaveData = true;
        if (!this.checkedTerms)
          this.showErrorTerms = true;
        //////////  && this.checkedSaveData
        if (this.validEmail(this.profile.email) && this.validEmail(this.userBilling.email) && this.checkedTerms) {
          this.step++;
          this.save();
          this.serviceConfigurationService.getAllServiceConfiguration().subscribe(
            (response: Array<ServiceConfiguration>) => {
              this.fillFormFoyPayOnline(form, response);
            });
        }
      }
      this.step += this.step === 1 ? 1 : 0;
      if (this.step > 3) {
        this.step = 1;
      }
    }
  }

  isDisableNextButton() {
    return this.shoppingCarService.listServices.length == 0;
  }

  encoding() {
    //let key = "4Vj8eK4rloUd272L48hsrarnUA";
    this.model.firma = this.md5Hex(this.key + "~" + this.model.usuarioId + "~" + this.model.refVenta + "~" + this.model.valor + "~" + this.model.moneda).toString();
    //this.model.firma = this.md5Hex(this.key + "~" + this.model.usuarioId + "~" + this.model.refVenta + "~" + this.model.valor + "~" + this.model.moneda).toString();
  }

  fillFormFoyPayOnline(form, response: Array<ServiceConfiguration>) {
    this.model.usuarioId = 66852;
    this.model.valor = this.shoppingCarService.total.toFixed(2);
    //let newiva: number = this.IVA;
    //newiva *= 100;
    //newiva += 100;
    //newiva /= 100;
    let valueIva = 0;//(this.shoppingCarService.total -(this.shoppingCarService.total/(newiva))).toFixed(2);
    this.model.emailComprador = this.profile.email;
    this.model.refVenta = (new Date().getTime());
    let description = "";
    let info = "('servicios':[";
    let infoServices = "";
    let cant = 0;
    let subTotal = 0;
    for (let s of this.shoppingCarService.listServices) {
      description = description + " " + s.description;
      if (cant > 0)
        infoServices += ",";
      infoServices += "('monto':" + s.price + ", 'minutos':" + s.minutes + ",'codigo_servicio':" + s.typeService + ", 'refBill':'" + s.referenceBill +
        "', 'refText':'" + s.referenceText + "', 'codSucursal':'" + s.codSucursal + "', 'licencia':'" + s.licenciaSerial + "')";
      subTotal += subTotal;
      for (let x of response) {
        if (x.hasIva && x.servicio.getId() == s.typeService) {
          let newiva: number = this.IVA;
          newiva *= 100;
          newiva += 100;
          newiva /= 100;
          let price = s.price - (s.price / newiva)
          valueIva += price;
        }
      }
      cant++;
    }
    this.subtotal = subTotal;
    info += infoServices + "])";
    this.model.iva = valueIva.toFixed(2);
    this.model.baseDevolucionIva = valueIva.toFixed(2);
    this.model.descripcion = description;
    this.model.extra1 = this.getUser() + "";
    this.model.extra2 = JSON.stringify(info);
    this.model.extra3 = JSON.stringify(this.model.extra3);
    this.encoding();


    //form['merchantId'].value=this.model.usuarioId;
    /* form['accountId'].value=this.model.accountId;
     form['description'].value=this.model.descripcion;
     form['referenceCode'].value=this.model.refVenta;
     form['amount'].value=this.model.valor;
     form['tax'].value=this.model.iva;
     form['taxReturnBase'].value=this.model.baseDevolucionIva;
     form['currency'].value=this.model.moneda;
     form['signature'].value=this.model.firma;
     form['test'].value=this.model.prueba;
     form['buyerEmail'].value=this.model.emailComprador;
     form['responseUrl'].value=this.model.url_respuesta;
     form['confirmationUrl'].value=this.model.url_confirmacion;
     form['extra1'].value=this.model.extra1;
     form['extra2'].value=this.model.extra2;
*/

    /////////////////////////////////////////////////////////////////////////////
    //form['usuarioId'].value = this.model.usuarioId;
    //form['descripcion'].value = this.model.descripcion;
    //form['refVenta'].value = this.model.refVenta;
    //form['moneda'].value = this.model.moneda;
    //form['iva'].value = 0;
    //form['valor'].value = this.model.valor;
    //form['baseDevolucionIva'].value = 0;
    //form['firma'].value = this.model.firma;
    //form['emailComprador'].value = this.model.emailComprador;
    //form['prueba'].value = this.model.prueba;
    //
    //form['url_respuesta'].value = this.model.url_respuesta;
    //form['url_confirmacion'].value = this.model.url_confirmacion;
    //form['extra1'].value = this.model.extra1;
    //form['extra2'].value = this.model.extra2;
    //form['extra3'].value = this.model.extra3;
    ////////////////////////////////////////////////////////////////////////////

    form['merchantId'].value = '508029'; //this.model.accountId;//'66852'//this.model.usuarioId; //'508029';
    form['ApiKey'].value = '4Vj8eK4rloUd272L48hsrarnUA'; //this.key;
    form['referenceCode'].value = 'TestVenta30';//this.model.refVenta;  //'TestPayU'; 
    form['amount'].value = this.model.valor//75000;//this.model.valor;//; //
    form['currency'].value = this.model.moneda; //'USD'; 
    form['accountId'].value = this.model.accountId; //'512326';
    form['buyerEmail'].value = this.model.emailComprador; //'test@test.com';
    form['description'].value = this.model.descripcion; //'Test PAYU';
    form['url_respuesta'].value = "http://localhost:8080/user/verification-payment"//this.model.url_respuesta;
    form['url_confirmacion'].value = this.model.url_confirmacion;//"http://localhost:8080/payment/confirmation" //this.model.url_confirmacion;
    form['signature'].value = '50f07df3aba748237c0110b8362bf873'; //this.model.firma;
    form['extra1'].value = this.model.extra1;
    form['extra2'].value = this.model.extra2;
    form['extra3'].value = this.model.extra3;
    form['iva'].value = 0; //this.model.iva//0;

    //form['baseDevolucionIva'].value = 0; //this.model.baseDevolucionIva; //0;
    //'1f083115ca958fc3da0381cdad13a7a8'//this.model.firma;
    //form['prueba'].value = this.model.prueba;
    form.submit();
  }

  /*
  totalIva = 0;
  totalReteIva = 0;
  totalReteIca = 0;
  reteicaValue = "";
  showIva: boolean;
  cartera: boolean;
  cloud: boolean;
  valorSelect: string;
  */

  getInfoCookies() {
    this.reteIcaProducto1 = this.valorSelect;
    this.reteIcaProducto2 = this.valorSelect2;
    let description = "";
    let noIva = 0;
    let cant = 0;
    let porcentReteIca = this.profile.reteica;
    let porcentReteIva = this.profile.reteiva;
    let ica: number = 0;
    let calIva: number = 0;
    let iva: number = 0.19; //puede llegar a ser reemplazado
    this.totalIva = 0;
    let info3 = "('detalle':[";
    let infoServi = "";
    this.totalReteIva = 0;
    this.totalReteIca = 0;
    this.subtotal = 0;
    let xmil: boolean;
    let contador: number = 0;


    for (let s of this.shoppingCarService.listServices) {
      description = description + " " + s.description;
      if (cant == 0){
        console.log ("esta adentro :,v")
        this.getproducto1(s.typeService,s.basicPrice,s.carterIca,s.cartIVA);
      }else if(cant == 1){
        this.getproducto2(s.typeService,s.basicPrice,s.carterIca,s.cartIVA);
      }
      if(cant ==0 || cant ==1){
        this.sumatoriaTotales(s.typeService);
      }
      if (cant > 0)
        infoServi += ",";
      this.cloud = false;

      if (porcentReteIca != "" || porcentReteIca != null) {
        if (s.typeService == 9 || s.typeService == "9") {
          this.totalReteIca += 0;
        } else {
          let porcentValue = new RegExp("%");
          if (porcentValue.test(this.profile.reteica)) {
            xmil = false;
          } else {
            xmil = true;
          }
          let prereteIca = 0;
          if (!xmil) {
            this.reteicaValue = this.profile.reteica;
            this.profile.reteica = this.profile.reteica.replace(",", ".");
            let rIca: any = this.profile.reteica.slice(0, -1);
            ica = rIca / 100;
            prereteIca = (s.basicPrice * ica);
            this.totalReteIca += prereteIca;
          } else {
            this.reteicaValue = this.profile.reteica + " x Mil";
            this.profile.reteica = this.profile.reteica.replace(",", ".");
            ica = +this.profile.reteica;
            ica = ica / 1000;
            prereteIca = (s.basicPrice * ica);
            this.totalReteIca += prereteIca;
          }
        }
      } else {
        ica = 0;
      }

      if (s.typeService == 10 || s.typeService == "10") {
        this.cloud = true;
        noIva = s.basicPrice;
        contador += 1;
      }
      if (s.typeService == 9 || s.typeService == "9") {
        noIva = s.basicPrice;
        contador += 1;
      }

      this.subtotal += s.basicPrice;

      if (noIva == 0) {
        this.showIva = true;
      } else {
        if (contador == 2) {
          this.showIva = false;
          noIva = this.subtotal;
        } else {
          if (noIva == this.subtotal) {
            this.showIva = false;
          } else {
            this.showIva = true;
          }
        }
      }
      this.totalIva = (this.subtotal - noIva) * iva;
      if (porcentReteIva != "" || porcentReteIva != null) {
        let rIva: any = this.profile.reteiva.slice(0, -1);
        calIva = +rIva;
        calIva = calIva / 100;
        this.totalReteIva = this.totalIva * calIva;
      } else {
        calIva = 0;
      }

      let ca = (s.basicPrice * iva);
      let cartICA: number;
      let cartIVA: number;
      if (s.carterIca == undefined || s.carterIca == null) {
        cartICA = 0;
      } else {
        cartICA = s.carterIca;
        console.log ("melo "+ s.carterIca) ;
      }
      if (s.carterIva == undefined || s.carterIva == null) {
        cartIVA = 0;
      } else {
        cartIVA = s.carterIva;
      }

      if (s.typeService == 9 || s.typeService == "9") {
        infoServi += "('iva':" + ca.toFixed(2) + ", 'cantidad':" + s.minutes + ",'reteIca':" + cartICA.toFixed(2) +
          ",'reteIva':'" + cartIVA.toFixed(2) + "', 'valorUni':'" + s.basicPrice.toFixed(2) + "','access':'" + s.accessQuantity + "')";
      } else {
        infoServi += "('iva':" + ca + ", 'cantidad':" + s.minutes + ",'reteIca':" + (s.basicPrice * ica).toFixed(2) +
          ",'reteIva':'" + (ca * calIva).toFixed(2) + "', 'valorUni':'" + s.basicPrice.toFixed(2) + "','access':'" + s.accessQuantity + "')";
      }
      cant++;
    }

    let suma: number;
    suma = ((this.subtotal + this.totalIva) - this.totalReteIca) - this.totalReteIva;
    this.shoppingCarService.total = suma;
    info3 += infoServi + "])";
    console.log(info3);
    this.model.extra3 = info3;
  }

  //logica scorpio

 
  reteIcaProducto1="";
  reteIcaProducto2="";
  totalIva = 0;
  totalReteIva = 0;
  totalReteIca = 0;
  reteicaValue = "";
  showIva: boolean;
  cartera: boolean;
  cloud: boolean;
  valorSelect: string;
  valorSelect2: string;
  sumaFinalSubtotal:number = 0;
  sumaFinalvalorTotal:number = 0;
  sumaFinalreteIva:number = 0;
  sumaFinaliva:number = 0;
  sumaFinalreteIca:number = 0;

  producto1 = {subTotal: 0,valorTotal: 0,reteIva: 0,iva: 0,reteIca: 0};
  producto2 = {subTotal: 0,valorTotal: 0,reteIva: 0,iva: 0,reteIca: 0};
  

  getproducto1(tipoServicio,precioBasico, carterIca, carterIva){
    console.log("este es el carter IVA" + carterIva);
    let porcentReteIva = this.profile.reteiva;
    console.log("este es el %ivamelongo"+porcentReteIva);
    this.producto1.subTotal=0;
    let xmil: boolean;
    let ica= 0;
    let contador:number = 0;
    let noIva:number = 0;
    let calIva: number = 0;
    let iva: number = 0.19;
    
    
    if (this.reteIcaProducto1 != "" || this.reteIcaProducto1 != null) {
      if (tipoServicio == 9 || tipoServicio == "9") {
        this.totalReteIca += 0;
      } else {
        let porcentValue = new RegExp("%");
        if (porcentValue.test(this.reteIcaProducto1)) {
          xmil = false;
        } else {
          xmil = true;
        }
        let prereteIca = 0;
        if (!xmil) {
          this.reteicaValue = this.reteIcaProducto1;
          this.reteIcaProducto1 = this.reteIcaProducto1.replace(",", ".");
          let rIca: any = this.reteIcaProducto1.slice(0, -1);
          ica = rIca / 100;
          prereteIca = (precioBasico * ica);
          this.producto1.reteIca = prereteIca;
        } else {
          this.reteicaValue = this.reteIcaProducto1 + " x Mil";
          this.reteIcaProducto1 = this.reteIcaProducto1.replace(",", ".");
          ica = +this.reteIcaProducto1;
          ica = ica / 1000;
          prereteIca = (precioBasico * ica);
          this.producto1.reteIca = prereteIca;
        }
      }
    } else {
      ica = 0;
    }
     this.producto1.subTotal += precioBasico;
    console.log("este es el ivaa "+ iva);
    console.log(this.producto1.subTotal * iva);
  

    if (tipoServicio == 10 || tipoServicio == "10" || tipoServicio == 9 || tipoServicio == "9" ) {
      this.producto1.reteIca = 0;
      this.producto1.reteIva = 0;
      this.producto1.iva = 0;
    }else{
      this.producto1.iva = this.producto1.subTotal * iva;
    }

    console.log("iva prron"+ this.producto1.iva);



      console.log("este es el % Iva "+ porcentReteIva);
      if (porcentReteIva != "" && porcentReteIva != null) {
        console.log (porcentReteIva);
        let rIva: any = this.profile.reteiva.slice(0, -1);
        calIva = +rIva;
        calIva = calIva / 100;
        console.log ("cal iva" + calIva);
        this.producto1.reteIva = this.producto1.iva * calIva;
        console.log ("esto es lo que hay que"+this.producto1.iva);
      } else {
        calIva = 0;
      }

      let ca = (precioBasico * iva);
     
  
      this.producto1.valorTotal = (this.producto1.subTotal + this.producto1.iva) - (this.producto1.reteIca + this.producto1.reteIva);

      console.log ("iva faragod "+ " " +this.producto1.iva);
      console.log ("reteicafaragod "+" " + this.producto1.reteIca);
      console.log ("reteivafaragod "+ " " +this.producto1.reteIva);
      console.log ("sub totalfaragod "+ " " +this.producto1.subTotal);
      console.log ("valor totalfaragod "+ " " +this.producto1.valorTotal);

    
     
      
    /*
      esta mierda es lo del las exclusiones de tipo de servicio
    
      if (tipoServicio == 10 || tipoServicio == "10") {
        this.producto1.reteIca = 0;
        this.producto1.reteIva = 0;
        this.cloud = true;
      }
      if (tipoServicio == 9 || tipoServicio == "9") {
        this.producto1.reteIca = 0;
        this.producto1.iva = 0;
      }
      this.producto1.subTotal += precioBasico;
        if (noIva == 0) {
          this.showIva = true;
        } else {
          if (contador == 1) {
            this.showIva = false;
            noIva =this.producto1.subTotal;
          } else {
            if (noIva == this.producto1.subTotal) {
              this.showIva = false;
            } else {
              this.showIva = true;
            }
          }
        }
       */
        /*   //cosa de cartera
        if (carterIca == undefined || carterIca == null) {
          this.producto1.reteIca = 0;
        } else {
          this.producto1.reteIca = carterIca;
          console.log ("melo"+ carterIca) ;
        }
        if (carterIva == undefined || carterIva == null) {
          this.producto1.reteIva = 0;
        } else {
          this.producto1.reteIva = carterIva;
        }*/
  }

  //producto numero 2

  getproducto2(tipoServicio,precioBasico, carterIca, carterIva){
    console.log("este es el carter IVA" + carterIva);
    let porcentReteIva = this.profile.reteiva;
    console.log("este es el %ivamelongo"+porcentReteIva);
    this.producto2.subTotal=0;
    let xmil: boolean;
    let ica= 0;
    let contador:number = 0;
    let noIva:number = 0;
    let calIva: number = 0;
    let iva: number = 0.19;
    
    
    if (this.reteIcaProducto2 != "" || this.reteIcaProducto2 != null) {
      if (tipoServicio == 9 || tipoServicio == "9") {
        this.totalReteIca += 0;
      } else {
        let porcentValue = new RegExp("%");
        if (porcentValue.test(this.reteIcaProducto2)) {
          xmil = false;
        } else {
          xmil = true;
        }
        let prereteIca = 0;
        if (!xmil) {
          this.reteicaValue = this.reteIcaProducto2;
          this.reteIcaProducto2 = this.reteIcaProducto2.replace(",", ".");
          let rIca: any = this.reteIcaProducto2.slice(0, -1);
          ica = rIca / 100;
          prereteIca = (precioBasico * ica);
          this.producto2.reteIca = prereteIca;
        } else {
          this.reteicaValue = this.reteIcaProducto2 + " x Mil";
          this.reteIcaProducto2 = this.reteIcaProducto2.replace(",", ".");
          ica = +this.reteIcaProducto2;
          ica = ica / 1000;
          prereteIca = (precioBasico * ica);
          this.producto2.reteIca = prereteIca;
        }
      }
    } else {
      ica = 0;
    }
    /*
      esta mierda es lo del las exclusiones de tipo de servicio
    
      if (tipoServicio == 10 || tipoServicio == "10") {
      this.cloud = true;
      noIva = precioBasico;
    }
    if (tipoServicio == 9 || tipoServicio == "9") {
      noIva = precioBasico;
      contador += 1;
    }
    this.subtotal += precioBasico;
      if (noIva == 0) {
        this.showIva = true;
      } else {
        if (contador == 1) {
          this.showIva = false;
          noIva = this.subtotal;
        } else {
          if (noIva == this.subtotal) {
            this.showIva = false;
          } else {
            this.showIva = true;
          }
        }
      }*/
      /* cosa de cartera
      if (carterIca == undefined || carterIca == null) {
        this.producto1.reteIca = 0;
      } else {
        this.producto1.reteIca = carterIca;
        console.log ("melo"+ carterIca) ;
      }
      if (carterIva == undefined || carterIva == null) {
        this.producto1.reteIva = 0;
      } else {
        this.producto1.reteIva = carterIva;
      }*/

      this.producto2.subTotal += precioBasico;

      if (tipoServicio == 10 || tipoServicio == "10" || tipoServicio == 9 || tipoServicio == "9" ) {
        this.producto2.reteIca = 0;
        this.producto2.reteIva = 0;
        this.producto2.iva = 0;
      }else{
        this.producto2.iva = this.producto2.subTotal * iva;
      }


      console.log("este es el % Iva "+ porcentReteIva);
      if (porcentReteIva != "" && porcentReteIva != null) {
        console.log (porcentReteIva);
        let rIva: any = this.profile.reteiva.slice(0, -1);
        calIva = +rIva;
        calIva = calIva / 100;
        console.log ("cal iva" + calIva);
        this.producto2.reteIva = this.producto2.iva * calIva;
        console.log (this.producto2.iva);
      } else {
        calIva = 0;
      }

      let ca = (precioBasico * iva);
     
      this.producto2.valorTotal = (this.producto2.subTotal + this.producto2.iva) - (this.producto2.reteIca + this.producto2.reteIva);




      console.log ("iva"+ " " +this.producto1.iva);
      console.log ("reteica"+" " + this.producto1.reteIca);
      console.log ("reteiva"+ " " +this.producto1.reteIva);
      console.log ("sub total"+ " " +this.producto1.subTotal);
      console.log ("valor total"+ " " +this.producto1.valorTotal);
      console.log ("aqui empieza producto 2");
      console.log ("iva2"+ " " +this.producto2.iva);
      console.log ("reteica2"+" " + this.producto2.reteIca);
      console.log ("reteiva2"+ " " +this.producto2.reteIva);
      console.log ("sub total2"+ " " +this.producto2.subTotal);
      console.log ("valor total2"+ " " +this.producto2.valorTotal);

      
  }


  //sumatoria de todos los totales 

  sumatoriaTotales(tipoServicio){
    //let sumaFinalSubtotal:number = 0;
    //let sumaFinalvalorTotal:number = 0;
    //let sumaFinalreteIva:number = 0;
    //let sumaFinaliva:number = 0;
    //let sumaFinalreteIca:number = 0;
  console.log(tipoServicio);
    if (tipoServicio == 9 || tipoServicio == "9" || tipoServicio == 10 || tipoServicio == "10"){
      console.log("esta dentro del if de tipo de servicio")
      this.sumaFinalreteIva = 0;
      this.sumaFinaliva = 0;
      //this.sumaFinalreteIca = 0;
      this.sumaFinalSubtotal = (this.producto1.subTotal + this.producto2.subTotal);
      this.sumaFinalvalorTotal = (this.producto1.valorTotal + this.producto2.valorTotal);
      console.log(("estos son los totales 1 ")+this.producto1.valorTotal);
      console.log(("estos son los totales 2 ")+this.producto2.valorTotal);

    }else{
      this.producto2.valorTotal = (this.producto2.subTotal + this.producto2.iva) - (this.producto2.reteIca + this.producto2.reteIva);

      this.sumaFinalSubtotal = (this.producto1.subTotal + this.producto2.subTotal);
      this.sumaFinalvalorTotal = (this.producto1.valorTotal + this.producto2.valorTotal);
      this.sumaFinalreteIva = (this.producto1.reteIva + this.producto2.reteIva);
      this.sumaFinaliva = (this.producto1.iva + this.producto2.iva);
      this.sumaFinalreteIca = (this.producto1.reteIca + this.producto2.reteIca);

    }


   

    console.log("sumas finales");
    console.log("suma subtotal "+ this.sumaFinalSubtotal);
    console.log("sumas valor total " + this.sumaFinalvalorTotal);
    console.log("sumas reteiva" + this.sumaFinalreteIva);
    console.log("sumas iva" + this.sumaFinaliva);
    console.log("sumas reteica" + this.sumaFinalreteIca);

  }




  //logica scorpio

  getICA() {
    if (this.profile.cityrete == "158") {
      if (this.profile.reteica.includes('%')) {
        this.selectICa = true;
        this.datosICA = ["0,690 %", "0,966 %"];
        this.selectIcaValue = this.profile.reteica;
      }
      else if (this.profile.reteica != "") {
        this.selectICa = true;
        this.datosICA = ["6,90", "9,66"];
        this.selectIcaValue = this.profile.reteica;
      }
    } else if (this.profile.cityrete == "1013") {
      if (this.profile.reteica.includes('%')) {
        this.selectICa = true;
        this.datosICA = ["0,660 %", "1,000 %"];
        this.selectIcaValue = this.profile.reteica;
      } else if (this.profile.reteica != "") {
        this.selectICa = true;
        this.datosICA = ["6,60", "10,00"];
        this.selectIcaValue = this.profile.reteica;
      }
    }
    else {
      this.selectICa = false;
    }
  }

  getUser() {
    return this.cookie.get('helisa-c-services');
  }

  getRegimens() {
    this.service.getRegimens().subscribe(
      regimen => this.regimens = regimen
    )
  }

  getService() {
    this.service.profileObservable.subscribe(
      profile => {
        this.profile = profile;
        this.getICA();
        this.valorSelect = this.profile.reteica;
        this.valorSelect2 = this.profile.reteica;
        this.reteIcaProducto1
        this.getInfoCookies();
      }
    );
  }

  getBilling() {
    this.billingService.getBilling(this.getUser()).subscribe(
      data => {
        if (data)
          this.userBilling = data;
      }
    );
  }

  getCiudades() {
    this.ciudadService.getCiudades().subscribe(
      ciudades => {
        this.ciudades = ciudades
      }
    )
  }

  //26-04-2018ys ciudad Pagos
  /* getCiudadesbydep(){
     this.ciudadService.getCiudadesByIdCountry(this.ciudades).subscribe(
       ciudades => {
         this.ciudades = ciudades
       }
     )
   }*/

  getPaises() {
    this.service.getPaises().subscribe(
      paises => {
        this.paises = paises
      }
    )
  }

  save() {
    this.showErrorTerms = false;
    this.showErrorSaveData = false;
    if (this.profile.tipoDocumento == '') {
      this.errorDocumentType = true;
    }
    if (!this.checkedSaveData)
      this.showErrorSaveData = true;
    if (!this.checkedTerms)
      this.showErrorTerms = true;
    if (!this.errorDocumentType && this.validEmail(this.profile.email) && this.validEmail(this.userBilling.email) && this.checkedTerms && this.checkedSaveData) {
      this.userApp.nombre1 = this.profile.nombre1;
      this.userApp.email = this.profile.email;
      this.userApp.direccion = this.profile.direccion;
      this.userApp.telefono = this.profile.telefono;
      this.userApp.usuario = this.profile.usuario;
      this.userApp.ciudad = this.profile.ciudadObj.id;
      this.userApp.pais = this.profile.paisObj.id;
      this.userApp.regimen = this.profile.regimenObj.id;
      this.userApp.tipoDocumento = this.profile.tipoDocumentoObj.codigo;
      this.userApp.nit = this.profile.nit;
      this.service.save(this.userApp).subscribe(
        data => {
          if (this.checkedSaveData) {
            this.userBilling.company = this.getUser();
            this.billingService.saveBilling(this.userBilling).subscribe(
              data => { }
            )
          }
        }
      )
    }
  }

  cleanShoppingCar() {
    this.shoppingCarService.cleanShoppingCar();
  }

  loadSettings() {
    this.settingService.getSetting(Constants.getNameSettingURLConfirmation()).subscribe(
      (data) => {
        this.model.url_confirmacion = data.value;
      }
    );

    this.settingService.getSetting(Constants.getNameSettingPayMode()).subscribe(
      (data) => {
        this.model.prueba = +data.value;
      }
    );

    this.settingService.getSetting(Constants.getNameSettingPayuURL()).subscribe(
      (data) => {
        this.urlSendForm = data.value;
      }
    );

    this.settingService.getSetting(Constants.getNameSettingURLResponse()).subscribe(
      (data) => {
        this.model.url_respuesta = data.value;
      }
    );

    this.settingService.getSetting(Constants.getNameSettingKeyPayments()).subscribe(
      (data) => {
        this.key = data.value;
      }
    );

  }

  validEmail(email) {
    return this.regexEmail.test(email);
  }

  onSelectTypeDocument(tipoDocumento) {
    this.selectTypeDocument = tipoDocumento.tipo;
    this.profile.tipoDocumento = tipoDocumento.href;
    this.profile.tipoDocumentoObj = tipoDocumento;
  }

  //scorpion
  /*mostrar_compra1(){
    if(this.compra1){
      this.compra1 = false;
    }else{
      this.compra1 = true;
    }
  }*/

  nombreServicio="";
  mostrar_compra2(i,description){
    
    console.log("esta webada es i "+i);
    console.log("esta webada es descripcion "+description);
    if(i == 0){ 
      this.nombreServicio = description;
      this.compra1 = true;
      this.compra2 = false;
    }else if (i == 1){
      this.nombreServicio = description;
      this.compra2 = true;
      this.compra1 = false;
    }
  }
  cerrarVentana(){
    console.log("pipu pipu");
    this.compra1 = false;
    this.compra2 = false;
  }


  //scorpion

}
