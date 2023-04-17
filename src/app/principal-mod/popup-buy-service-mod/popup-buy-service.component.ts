import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Usuario } from "../../model/Usuario";
import { TipoDocumento } from "../../model/TipoDocumento";
import { Pais } from "../../model/Pais";
import { Ciudad } from "../../model/Ciudad";
import { Regimen } from "../../model/Regimen";
import { Departamento } from "../../model/Departamento";
import { Location } from '@angular/common';
import { Servicio } from "../../model/Servicio";
import { PopupBuyService } from "./popup-buy-service.service";
import { ServicioImplementacionHoras } from "../../model/ServicioImplementacionHoras";
import { BuyServicesService } from "../buy-services-mod/buy-services.service";
import { ShoppingCarService } from "../shopping-car-mod/shopping-car-service";
import { Constants } from "../../shared/Constants";
import { Observable } from "rxjs";
import { ValidationService } from "../../shared/services/validation.service";
import { SettingService } from "../../shared/services/setting.service";
import { constants } from "os";
import { ServiceConfigurationService } from "../../shared/services/service-configuration.service";
import { ServiceConfiguration } from "../../model/ServiceConfiguration";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-popup-buy-service',
  templateUrl: './popup-buy-service.component.html',
  styleUrls: ['./popup-buy-service.component.css']
})
export class PopupBuyServiceComponent implements OnInit {

  private typeService: number;
  private serviceConfiguration: ServiceConfiguration;
  service: Servicio = new Servicio();
  title: string;
  IVA: number = Constants.getIVA();
  idImplement: number = Constants.getIdImplement();
  idRemoteAssistant: number = Constants.getIdRemoteAssistant()
  idTechnicalVisit: number = Constants.getIdTechnicalVisit();
  idWalletPayment: number = Constants.getIdPayments();
  idHelisaCloud: number = Constants.getIdHelisaCloud();
  idInfoExogena: number = Constants.getIdInfoExogena();
  expireDate = { month: 0, year: 0 };

  profile: Usuario = new Usuario('', new TipoDocumento(0, '', ''), '', '', '', null, '', '', '', '', '', '', '', '', '', null,
    '', new Ciudad(0, '', new Departamento(0, ''), ''), new Pais(0, '', ''), '', '', new Regimen(0, '', ''), '', '', '', '', '', '', '');//ys 23-04-2018



  showButtonAddToCar: boolean = false;
  showButtonDeactivate: boolean = false;
  activateRecurringPayment: boolean = false;
  showFormInfoCreditCard: boolean = false;

  disableButtonPayNow: boolean = false;

  desactivarPago: boolean = false;
  showChange: boolean = false;
  showAceptar: boolean = false;
  show: boolean = true;

  licenciaValid: boolean = false;
  textLicenciaValid: string = '';

  numberCreditCardValid: boolean = false;

  yearCreditCardValid: boolean = false;

  moreThreeService: boolean = false;

  showReteIca: boolean = false;
  showIvaReteIva: boolean = false;
  xmil : boolean = false;


  /*Initial Lists*/
  listRemoteAssistant = [60, 120, 180, 240, 300, 360, 420, 480];
  listHoursImplementation: Array<number>;
  listHoursTechnicalVisit: Array<number>;

  /*Objects to save information */
  objectSelected = { typeService: -1, minutes: -1, description: "", price: 0, modulo: '', idServicioImplementacion: -1, referenceBill: '', referenceText: '', codSucursal: 0, licenciaSerial: '', basicPrice:0, accessQuantity: 0, carterIva: 0, carterIca: 0 };
  objectFormDataCredir = { name: null, numberCreditCard: null, mothExpiration: null, yearExpiration: null, cityCard: null, address: null, idService: null, idBuyer: null };

  quantityAccess: number = 1;
  currentQuantityAccess: number = 0;
  valuePaymentWallet: number = 1;
  dataTable = { totalProductos: 0, iva: 0, reteIca: 0, reteIva: 0, resultado: 0 };
  textValueWithCost: string;
  listaServiciosImplementacionHoras: Array<ServicioImplementacionHoras>;
  titlePopup: string = "";
  successMessage: string = "";

  informacionExogenaNit: string;
  errorInformacionExogenaNit: boolean = false;
  informacionExogenaEmpresa: string;
  informacionExogenaLicencia: string;
  errorInformacionExogenaLicencia: boolean = false;
  stepInformacionExogena = 1;

  showIva: boolean = true;

  user: string = "null";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private buyService: BuyServicesService,
    private popupBuyService: PopupBuyService,
    private shoppingCarService: ShoppingCarService,
    private validationService: ValidationService,
    private settingService: SettingService,
    private serviceConfigurationService: ServiceConfigurationService,
    private cookie: CookieService,
    private serviceProfile: ProfileService,
  ) {
  }

  ngOnInit() {

    this.user = this.getUser();
    this.serviceProfile.getProfile(this.user);
    this.getService();

    /* Carga nuevamente el IVA */
    this.settingService.getSetting("iva").subscribe(
      data => {
        Constants.setIVA(data.value);
        this.IVA = Constants.getIVA();
      }
    );

    this.route.params
      .subscribe((params: Params) => {
        this.typeService = +params['type'];
        if (this.typeService == this.idInfoExogena) {
          this.stepInformacionExogena = 1;
        }
      });
    
    
      
    this.buyService.getService(this.typeService).subscribe(
      (service: Servicio) => {
        this.serviceConfigurationService.getServiceConfiguration(service.id).subscribe(
          (response: ServiceConfiguration) => {
            this.serviceConfiguration = response;
            this.showIva = this.serviceConfiguration.hasIva;
            this.service = service;
            this.titlePopup = this.service.descripcion;
            this.objectFormDataCredir.idService = this.service.id;
            this.doReplaceOnFieldTextValue();
            this.fillLists();
            this.fillDefaultValues();
            this.showButtonAddToCar = Constants.getIdInfoExogena() != this.service.getId();
            this.disableButtonPayNow = !this.showButtonAddToCar;
            
            if (this.shoppingCarService.listServices.length >= 1) {
              this.showButtonAddToCar = false;
            }
            if (this.service.id == this.idHelisaCloud) {
              
              this.loadCountConnections();
              this.onChangeQuantityAccess();
            }
          }
        );
      }
    );
    
    if (this.typeService == Constants.getIdImplement()) {//Si es implementacion se carga los Servicios
      this.popupBuyService.getServicioImplementacionHoras().subscribe(
        (list) => {
          this.listaServiciosImplementacionHoras = list;
        }
      );
    }
  }

  validationValues() {
    if (this.profile.reteica == "" || this.profile.reteica == null) {
      this.showReteIca = false;
    } else {
      var porcentValue = new RegExp("%");
      if (porcentValue.test(this.profile.reteica)) {
        this.showReteIca = true;
      } else {
        this.showReteIca = true;
        this.xmil = true;
      }
    }
    if ( this.profile.reteiva.trim() != "" ) {
      this.showIvaReteIva = true;
    } else {
      this.showIvaReteIva = false;
    }
    this.doReplaceOnFieldTextValue();
    this.fillLists();
    this.fillDefaultValues();
  }

  getUser() {
    return this.cookie.get('helisa-c-services');
  }

  getService() {
    this.serviceProfile.profileObservable.subscribe(
      profile => {
        this.profile = profile;
        this.validationValues();
        
        //document.getElementById("buttonValidationValues").click();
      }
    );
  }

  fillDefaultValues() {
    if (this.typeService == Constants.getIdImplement()) {
      Observable.timer(1000).subscribe(x => {
        this.onSelectProduct(this.listaServiciosImplementacionHoras[0]);
      });
    } else if (this.typeService == Constants.getIdTechnicalVisit()) {
      if (this.listHoursTechnicalVisit != null && this.listHoursTechnicalVisit.length > 0) {
        this.objectSelected.minutes = this.listHoursTechnicalVisit[0];
        this.onChangeHoursInTechnicalVisit(this.objectSelected.minutes);
      }
    } else if (this.typeService == Constants.getIdRemoteAssistant()) {
      this.objectSelected.minutes = this.listRemoteAssistant[0];
      this.onSelectHoursForRemoteAssistants(this.listRemoteAssistant[0]);
    }
  }

  fillLists() {
    if (this.typeService == Constants.getIdTechnicalVisit()) {//Visita Tecnica
      this.listHoursTechnicalVisit = new Array<number>();
      for (let i = 1; i < 50; i++) {
        this.listHoursTechnicalVisit.push(i + 1);
      }
    }
  }

  doReplaceOnFieldTextValue() {
    this.textValueWithCost = this.service.textValue.replace("[VALUE_SERVICE]", this.service.precio + "");
  }

  back() {
    this.location.back();
    // this.router.navigate([{outlets: {popup: null}}]);
  }


  onSelectProduct(servicioImplementacion: ServicioImplementacionHoras) {
    this.objectSelected.modulo = servicioImplementacion.modulo;
    this.objectSelected.idServicioImplementacion = servicioImplementacion.id;
    this.objectSelected.minutes = -1;
    this.listHoursImplementation = new Array<number>();
    this.cleanTablePayments();
    let to = 10;
    if (servicioImplementacion.horas == 1)
      to = 1;
    for (var i = 0; i < to; i++) {
      this.listHoursImplementation.push((i + 1) * servicioImplementacion.horas);
    }
    this.onSelectHoursImplementation(this.listHoursImplementation[0]);

  }

  onSelectHoursImplementation(hours: number) {
    this.objectSelected.minutes = hours;
    this.calculateTablePayments((this.objectSelected.minutes) * this.service.precio);
  }

  calculateTablePayments(costProduct: number) {
    if (this.serviceConfiguration.hasIva) {
      this.dataTable.iva = costProduct * this.IVA;
      console.log(this.IVA);
    }
    else this.dataTable.iva = 0;
    if (this.showReteIca) {
      if(!this.xmil){
        this.profile.reteica = this.profile.reteica.replace(",", ".");
        var rIca: any = this.profile.reteica.slice(0, -1);
        var ica: number = +rIca;
        this.dataTable.reteIca = (costProduct * ica) / 100;
      }else{
        this.profile.reteica = this.profile.reteica.replace(",",".");
        var ica: number = +this.profile.reteica;
        this.dataTable.reteIca = (costProduct * ica) / 1000;
        console.log(this.dataTable.reteIca);
      }
    }else{
      this.dataTable.reteIca = 0;
    }

    if(this.showIvaReteIva){
      var rIva: any = this.profile.reteiva.slice(0, -1);
      var calIva = +rIva;
      this.dataTable.reteIva = (this.dataTable.iva * calIva) / 100;
      console.log(this.dataTable.reteIva);
    }else{
      this.dataTable.reteIva = 0;
    }
    this.dataTable.totalProductos = costProduct + this.dataTable.iva; 
    this.dataTable.resultado = (costProduct - this.dataTable.reteIca) + (this.dataTable.iva  - this.dataTable.reteIva);
    this.dataTable.totalProductos = (costProduct - this.dataTable.reteIca) + (this.dataTable.iva  - this.dataTable.reteIva);

  }

  cleanTablePayments() {
    this.dataTable.iva = 0;
    this.dataTable.reteIca = 0;
    this.dataTable.reteIva = 0;
    this.dataTable.totalProductos = 0;
  }

  onSelectHoursForRemoteAssistants(minutes: number) {
    this.objectSelected.minutes = minutes;
    this.calculateTablePayments((this.objectSelected.minutes / 60) * this.service.precio);
  }

  onChangeHoursInTechnicalVisit(hours: number) {

    this.objectSelected.minutes = hours * 60;
    if (hours == 2) {
      this.calculateTablePayments(260000);
    } else if (hours == 3) {
      this.calculateTablePayments(300000);
    } else if (hours == 4) {
      this.calculateTablePayments(320000);
    } else {
      this.calculateTablePayments(((hours - 4) * 80000) + 320000);
    }

    /*this.objectSelected.minutes=hours*60;
    this.calculateTablePayments((this.objectSelected.minutes)*(this.service.precio/this.service.tiempo));*/
  }

  addToShoppingCar(back: boolean) {
    /* Limpia el carro si compran medios magneticos */
    if (this.service.getId() == Constants.getIdInfoExogena())
      this.shoppingCarService.cleanShoppingCar();
    else this.shoppingCarService.cleanShoppingCarInfoExogena();

    if(this.service.getId() == 10){
      this.objectSelected.accessQuantity = this.quantityAccess;
    }
    this.objectSelected.typeService = this.typeService;
    this.objectSelected.description = this.service.descripcion;
    this.objectSelected.basicPrice = this.dataTable.totalProductos-this.dataTable.iva+this.dataTable.reteIca+this.dataTable.reteIva

    if(this.service.getId() == 9){
      this.objectSelected.basicPrice = this.objectSelected.price;
    }

    if (this.typeService == this.idWalletPayment) {


    } else {

      this.objectSelected.price = this.dataTable.totalProductos;
      console.log(this.objectSelected.price)
    }
    this.shoppingCarService.addService(this.objectSelected);
    console.log(this.objectSelected);
    if (back) this.back();
  }


  goToStepsPayment() {

    if (this.shoppingCarService.listServices.length <= 1) {
      this.addToShoppingCar(false);
      this.router.navigate([{ outlets: { popup: null } }]).then(_ => this.router.navigate(['/company/secure/steps-payment']));
    } else {
      this.moreThreeService = true
    }

  }

  getTechnicalVisitHours() {
    return this.objectSelected.minutes / 60;
  }

  getImplementationHours() {
    return this.objectSelected.minutes == -1 ? "" : this.objectSelected.minutes;
  }

  canGoToPay() {
    //this.addToShoppingCar();
    return this.shoppingCarService.listServices.length > 0;
  }

  onChangeQuantityAccess() {
    if (this.quantityAccess < 0)
      this.quantityAccess = 0;
    this.calculateTablePayments(this.quantityAccess * this.service.precio);
  }

  onCheckedPaymentRecurring() {
    this.activateRecurringPayment = !this.activateRecurringPayment;
    this.showTable();
  }

  goToFormDataCredit() {
    let d = new Date();
    this.expireDate.month = d.getMonth() + 1;
    this.expireDate.year = d.getFullYear();
    this.showFormInfoCreditCard = true;
    this.titlePopup = "Datos de la Tarjeta Crédito";
  }

  showTable() {
    if (this.typeService == this.idHelisaCloud)
      return !this.showFormInfoCreditCard;
    return this.typeService != this.idWalletPayment;
  }

  loadCountConnections() {
    this.popupBuyService.getCountConnectiosByServices(this.service.id).subscribe(
      data => {
        let countConnections = +data.value;
        if (countConnections > 0) {
          this.quantityAccess = countConnections;
          this.currentQuantityAccess = countConnections;
          this.showButtonDeactivate = true;
          this.onChangeQuantityAccess();
          this.onCheckedPaymentRecurring();
        }
      }
    )
  }

  onFinishRecurringPayment() {
    this.numberCreditCardValid = false;
    this.yearCreditCardValid = false;

    if (this.objectFormDataCredir.numberCreditCard == null ||
      this.objectFormDataCredir.numberCreditCard == '') {
      this.numberCreditCardValid = true;
    }

    if (this.objectFormDataCredir.yearExpiration == null ||
      this.objectFormDataCredir.yearExpiration == '' || this.objectFormDataCredir.yearExpiration < this.expireDate.year) {
      this.yearCreditCardValid = true;
    }

    if (this.objectFormDataCredir.name != null &&
      this.objectFormDataCredir.idBuyer != null &&
      this.objectFormDataCredir.mothExpiration != null &&
      this.objectFormDataCredir.cityCard != null &&
      this.objectFormDataCredir.numberCreditCard != null &&
      this.objectFormDataCredir.yearExpiration != null &&
      this.objectFormDataCredir.address != null) {

      this.popupBuyService.sendInfoRecurringPayment(this.objectFormDataCredir, this.quantityAccess, this.dataTable.totalProductos).subscribe(
        data => {
          if (data.status == 201 || data.status == 200) {
            this.showInfo(3, "Pago recurrente activo!");
          } else {
            this.showInfo(3, "No se pudo activar el pago recurrente. Contacte soporte para mas información!");
          }
          this.showFormInfoCreditCard = false;
          this.showAceptar = true;
        }
      );
    }
  }

  showInfo(value: number, message: string) {
    if (value == 1) {
      this.titlePopup = "Desactivados los Accesos Helisa Hosting";
    } else if (value == 2) {
      this.titlePopup = "Cambio en los Accesos Helisa Hosting";
    } else {
      this.titlePopup = "Comprar Accesos Helisa Hosting";
    }
    this.successMessage = message;
  }

  cancelRecurringPayment() {
    this.popupBuyService.cancelRecurringPayment(this.service.id).subscribe(
      data => {
        if (data.status == 200) {
          this.showInfo(1, "Pago recurrente desactivado!");
        } else {
          this.showInfo(1, "No se pudo desactivar el pago recurrente. Contacte soporte para mas información!");
        }
        this.activateRecurringPayment = false;
        this.showFormInfoCreditCard = false;
        this.showAceptar = true;
        this.showChange = false;
        this.desactivarPago = false;
        this.show = false;
      }
    );
  }

  changePlan() {
    if (this.quantityAccess != this.currentQuantityAccess) {
      this.popupBuyService.sendInfoRecurringPayment(this.objectFormDataCredir, this.quantityAccess, this.dataTable.totalProductos).subscribe(
        data => {
          this.currentQuantityAccess = this.quantityAccess;


          if (data.status == 200) {
            this.showInfo(2, "Pago recurrente a sido actualizado!");
          } else {
            this.showInfo(2, "No se pudo actualizar el pago recurrente. Contacte soporte para mas información!");
          }
          this.showFormInfoCreditCard = false;
          this.showAceptar = true;
        }
      );
    }
  }

  validate() {
    if (this.stepInformacionExogena == 1) {
      this.validationService.validateNit(this.informacionExogenaNit).subscribe(
        data => {
          this.errorInformacionExogenaNit = false;
          if (data.result) {
            this.stepInformacionExogena = 2;
            this.informacionExogenaEmpresa = data.companyName;
          } else
            this.errorInformacionExogenaNit = true;
        }
      );
    } else if (this.stepInformacionExogena == 2) {

      this.validationService.validateLicencia(this.informacionExogenaNit, this.informacionExogenaLicencia).subscribe(
        data => {
          this.errorInformacionExogenaLicencia = false;
          if (data.result) {
            this.licenciaValid = true;
            this.textLicenciaValid = 'Licencia Valida';
            this.objectSelected.codSucursal = data.codigoSucursal;
            this.objectSelected.licenciaSerial = data.licencia;
            this.informacionExogenaEmpresa = data.nombreSucursal;
            this.disableButtonPayNow = false;
            this.calculateTablePayments(this.service.precio);
          } else {
            this.textLicenciaValid = 'Licencia No Encontrada';
            this.errorInformacionExogenaLicencia = true;
            this.disableButtonPayNow = true;
            this.licenciaValid = false;
          }
        }
      );
    }
  }


}
