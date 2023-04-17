import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Usuario } from "../../model/Usuario";
import { Pais } from "../../model/Pais";
import { Ciudad } from "../../model/Ciudad";
import { Regimen } from "../../model/Regimen";
import { ProfileService } from "../../shared/services/profile.service";
import { Toast } from "../../model/Toast";
import { ToastService } from "../../shared/services/toast.service";
import { UsuarioService } from "../../shared/services/usuario.service";
import { BillingService } from '../../shared/services/billing.service';
import { TipoDocumento } from "../../model/TipoDocumento";
import { LoginService } from "../../login/login.service";
import { Observable } from "rxjs";
import { UserAppService } from "../../shared/services/user-app.service";
import { CiudadService } from "../../shared/services/ciudad.service";
import { Departamento } from "../../model/Departamento";
import { Billing } from "../../model/Billing";
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilesService } from '../../shared/services/file.service';
import swal from 'sweetalert';
import { CiudadEdit } from '../../model/CiudadEditCompany';
import { CompanyService } from "../../shared/services/company.service";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  use: Usuario[] = [];
  responsabilidades: string[];
  user: string = "null";
  profile: Usuario = new Usuario('', new TipoDocumento(0, '', ''), '', '', '', null, '', '', '', '', '', '', '', '', '', null,
    '', new Ciudad(0, '', new Departamento(0, ''),    /*new Pais(0,'',''),*/ ''), new Pais(0, '', ''), '', '', new Regimen(0, '', ''), '', '', '', '', '', '','');// new Pais(0,'',''), ys 23-04-2018

  ciudadEd: CiudadEdit;

  pro: Usuario = new Usuario('', new TipoDocumento(0, '', ''), '', '', '', null, '', '', '', '', '', '', '', '', '', null,
    '', new Ciudad(0, '', new Departamento(0, ''),    /*new Pais(0,'',''),*/ ''), new Pais(0, '', ''), '', '', new Regimen(0, '', ''), '', '', '', '', '', '', '');

  userApp = {
    usuario: "", nombre1: "", direccion: "", telefono: "", email: "", tipoDocumento: 0, ciudad: 0, pais: 0,
    regimen: 0, nit: "", responsabilidadesCode: "", emailRetencion: "", reteIca: "", reteIva: "", cityIca: ""
  };

  name:any;
  text: '';
  arregloDatos: {};
  userBilling: Billing = new Billing(null, '', '', '', '', '');
  fileData = { name: '' };
  path = '';
  fileNameInput = '';
  form: FormGroup;
  paises: Array<Pais>;
  ciudades: Array<Ciudad>;
  ciudadesEdit: Array<CiudadEdit>;
  regimens: Array<Regimen>;
  documentsTypes: Array<TipoDocumento>;
  errorDocumentType = false;
  errorBillingResponsabilities = false;
  errorEmail = false;
  selectTypeDocument = "";
  regexEmail = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@");
  checkedTerms = false;
  xmil = false;
  porcent = false;
  reteIVA = false;
  reteICA = false;
  reteICAXmil = "";
  reteICAPor = "";
  valorXmil = "";
  valorPorcent = "";
  result: number;

  validationButton = true;

  cityReteICASelect = false;
  cityReteICAselect2 = false;
  datosXmil = ["", ""];
  datosPor = ["", ""];
  xmilSelectValue = "";
  porcentSelectValue = "";
  porcentSelect = false
  xmilSelect = false;
  administrador = false;

  responsa: any;
  errorFile = false;
  reteIcaConditions = false;

  check01 = false; check02 = false; check03 = false; check04 = false; check05 = false; check06 = false; check07 = false;
  check08 = false; check09 = false; check10 = false; check13 = false;
  check14 = false; check15 = false; check16 = false; check17 = false; check18 = false;
  check19 = false; check20 = false; check21 = false; check22 = false; check23 = false; check24 = false;
  check26 = false; check32 = false; check35 = false; check36 = false; check37 = false;
  check38 = false; check39 = false; check40 = false; check41 = false;
  check42 = false; check47 = false; check48 = false; check49 = false;
  check50 = false; check51 = false; check52 = false;
  uploadFile = '';
  filepart = [];
  angForm: FormGroup;
  validation = true;
  role: any;

  constructor(private service: ProfileService, private router: Router, private route: ActivatedRoute,
    private cookie: CookieService, private _toastService: ToastService,
    private userService: UsuarioService, private loginService: LoginService,
    private ciudadService: CiudadService, private billingService: BillingService,
    private fb: FormBuilder, private fileSer: FilesService, private companyService: CompanyService,
    private userAppService: UserAppService) { }


    calR() {
      if (this.profile.cityrete!= "") {
        if (this.profile.cityrete == "158") {
          this.cityReteICASelect = true;
          this.cityReteICAselect2 = false;
          this.datosXmil = ["6,90", "9,66"];
          this.datosPor = ["0,690 %", "0,966 %"];
          if(this.xmilSelectValue=="" || this.porcentSelectValue == ""){
            this.xmilSelectValue = "6,90";
            this.porcentSelectValue = "0,690 %";
          }
          this.xmilSelectValue = this.profile.reteica;
          this.porcentSelectValue = this.profile.reteica;
        } else if (this.profile.cityrete == "10") {
          this.cityReteICASelect = false;
          this.cityReteICAselect2 = true;
          this.valorXmil = "2,00";
          this.valorPorcent = "0,200 %";
        } else if (this.profile.cityrete == "1013") {
          this.cityReteICASelect = true;
          this.cityReteICAselect2 = false;
          this.datosXmil = ["6,60", "10,00"];
          this.datosPor = ["0,660 %", "1,000 %"];
          if(this.xmilSelectValue!="6,60" && this.xmilSelectValue != "10,00" && 
          this.porcentSelectValue!="0,660 %" && this.porcentSelectValue != "1,000 %" ){
            this.xmilSelectValue = "6,60";
            this.porcentSelectValue = "0,660 %";
          }
          this.xmilSelectValue = this.profile.reteica;
          this.porcentSelectValue = this.profile.reteica;
        } else if (this.profile.cityrete == "205") {
          this.cityReteICASelect = false;
          this.cityReteICAselect2 = true;
          this.valorXmil = "9,00";
          this.valorPorcent = "0,900 %";
        } else {
          this.cityReteICASelect = false;
          this.cityReteICAselect2 = true;
          this.valorXmil = "11,04";
          this.valorPorcent = "1,104 %";
        }
        this.reteICAXmil = this.valorXmil;
        this.reteICAPor = this.valorPorcent;
      }
    }

  ngOnInit() {
    this.user = this.getUser();
    this.service.getProfile(this.user);
    this.pro = this.service.profile;
    this.getService();
    //this.getUserData(this.user);
    this.getCiudades();
    this.getPaises();
    this.getRegimens();
    this.getTipoDocumentos();
    this.getBilling();
    this.getUser();
    this.getUserAppService();
    
    setTimeout(function () {
      document.getElementById("submitFormOculto").click();
    }, 2000);
    setTimeout(function(){
      document.getElementById("cityRetencion").click();
    }, 2000);
    this.angForm = this.fb.group({
      fileDeal: [''],
      name: ''
    });

    this.companyService.getUserByProfile(this.cookie.get("helisa-user")).subscribe(
      data => {
        this.role = data;
        this.role = this.role._body;
        if ( this.role == 2) {
          this.validationButton = false;
          this.administrador = false;
        } else if (this.role == 1) {
          this.validationButton = true;
          this.administrador = false;
        }else if (this.role == "3"){
          this.validationButton = true;
          this.administrador = true;
        }
        else
        console.log("")
      }
    );
  }


  getUserAppService() {
    this.userAppService.getUserApp(this.cookie.get('helisa-user')).subscribe(
      user => {
        this.name = user.name +' '+ user.lastName ;
      }
    );
  }


  //getUserData(user) {
  //  return
  //}

  getTipoDocumentos() {
    this.userService.getDocumentsType().subscribe(
      data => {
        this.documentsTypes = data;
      }
    );
  }

  onSelectTypeDocument(tipoDocumento) {
    this.selectTypeDocument = tipoDocumento.tipo;
    this.profile.tipoDocumento = tipoDocumento.href;
    this.profile.tipoDocumentoObj = tipoDocumento;
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
        this.profile = profile
      }
    );
  }

  getCiudades() {
    this.ciudadService.getCiudades().subscribe(
      ciudades => this.ciudades = ciudades
    )
  }

  getPaises() {
    this.service.getPaises().subscribe(
      paises => {
        this.paises = paises
      }
    )
  }

  getBilling() {
    this.billingService.getBilling(this.getUser()).subscribe(
      data => {
        if (data)
          this.userBilling = data;
      }
    );
  }

  getFile() {
    var ext:any;
    this.fileSer.getDownloadFileSaveAs(this.profile.nit).subscribe(
      data=>{
        ext = data;
        ext = ext.type;
        if(ext == "application/pdf"){
          saveAs(data, this.profile.nit+'.pdf');
        }else if(ext == "image/jpeg"){
          saveAs(data, this.profile.nit+'.jpeg');
        }
      },
      error=>{
        swal("Error", " No existe ningun archivo para esta empresa  ", "error");
      }
    )

  }

  save() {
    console.log("llegando ando");
    if (this.profile.tipoDocumento == '') {
      this.errorDocumentType = true;
    }
    if(this.reteICA == false){
      this.reteIcaConditions = false;
    }
    console.log("XXXXXXXXXXXXXX");
    if (!this.errorDocumentType && this.validEmail(this.profile.email) && this.validEmail(this.userBilling.email) && this.checkedTerms && !this.errorBillingResponsabilities) {
      console.log("AAAAAAAAAAAAAAA")
      if (this.cityReteICASelect == true) {
        if (this.xmilSelect == true) {
          this.userApp.reteIca = this.xmilSelectValue;
          this.reteIcaConditions = false;
        } else if (this.porcentSelect == true) {
          this.userApp.reteIca = this.porcentSelectValue;
          this.reteIcaConditions = false;
        } else if(this.reteICA ==  true &&  this.xmilSelect == false && this.porcentSelect == false){
            this.reteIcaConditions = true;
        }
      } else if (this.cityReteICAselect2 == true) {
        if (this.reteICA == true) {
          if (this.xmil == true) {
            this.reteIcaConditions = false;
            this.userApp.reteIca = this.valorXmil;
          } else if (this.porcent == true) {
            this.reteIcaConditions = false;
            this.userApp.reteIca = this.valorPorcent;
          } else if(this.reteICA ==  true &&  this.xmil == false && this.porcent == false){
            this.reteIcaConditions = true;
          }
        }else{
          this.userApp.reteIca = "";
          this.reteIcaConditions = false;
        }
      }
      if (this.reteIVA == true) {
        this.userApp.reteIva = "15%";
      }else{
        this.userApp.reteIva = "";
      }
      this.profile.responsabilidadesCode = "";
      this.validateresponsibilities();
      this.profile.email = this.profile.email.toLowerCase();
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
      this.userApp.responsabilidadesCode = this.profile.responsabilidadesCode;
      this.userApp.emailRetencion = this.profile.emailretencion;
      this.userApp.email = this.userApp.email.toLowerCase();
      this.userApp.cityIca = this.profile.cityrete;
      console.log("entro aqui")
      swal({
        title: 'Comprobando informacion',
        text: 'Se esta guardando la informacion, esto puede demorar alrededor de un minuto',
        buttons: { 'cancel': false, 'ok': false },
        closeOnClickOutside: false,
        closeOnEsc: false
      });

      if (!this.errorFile) {
        if (!this.angForm.get('fileDeal').value == null || this.angForm.get('fileDeal').value != "") {
          const formData = new FormData();
          formData.append('file', this.angForm.get('fileDeal').value);
          formData.append('name', this.fileData.name);
          formData.append('code', this.profile.nit);
          formData.append('path', '' + this.path);
          formData.append('type', '' + 'Archive');
          this.fileSer.uploadFiles(formData).subscribe(
            dataUpload => {
              this.errorFile = false;
            }
          );
        } else {
          this.errorFile = false;
        }
        console.log(this.reteIcaConditions);
        if(!this.reteIcaConditions){ 
          this.service.save(this.userApp).subscribe(
            data => {
              this.userBilling.company = this.getUser();
              this.billingService.saveBilling(this.userBilling).subscribe(
                data => {
                  if (data.hasOwnProperty('res') && data.res === 'fail') {
                    swal("Error","Ocurrio algun error, por favor vuelva a intentarlo","error");
                    this.error();
                  } else {
                    this.fileSer.sendEmail(this.userApp.email,"editar", this.userApp.nombre1, this.userApp.nit, this.name).subscribe(
                      d =>{
                        console.log("enviando mail");
                       swal.close();
                        this._toastService.showToast(new Toast(0, "__ Empresa actualizada correctamente.", true));
                        this.router.navigate(['../info'], { relativeTo: this.route });
                      }
                    );
                  }
                }, (error) => {
                  swal("Error","Ocurrio algun error, por favor vuelva a intentarlo","error");
                  this.error();
                })
            }, (error) => {
              swal("Error","Ocurrio algun error, por favor vuelva a intentarlo","error");
              this.error();
            }
          )
        }else{
          swal("Error","Por favor seleccione algun tipo de tarifa para el reteICA","error");
        }
        
      } else {
        swal.close();
      }
    }
  }

  error() {
    swal("Error al actualizar los datos.", "Ocurrio un error al intentar actualizar los datos", 'error');
  }

  logout() {
    this.loginService.logout().subscribe(
      res => { }
    );
    this.cookie.remove("helisa-token");
    this.cookie.remove("helisa-user");
    this.cookie.remove("helisa-oid");
    this.cookie.remove("helisa-admin");
    this.cookie.put("shopping-car", null);
    this.router.navigate(['login']);
  }

  back() {
    this.router.navigate(['company/list']);
  }

  validEmail(email) {
    console.log(this.regexEmail.test(email) + ' aqui')
    return this.regexEmail.test(email);
  }



  validateICAXmil() {
    this.porcent = false;
    this.xmil = true;
  }

  validateICAPorcent() {
    this.xmil = false;
    this.porcent = true;
  }

  validateICAXmilSelect() {
    this.porcentSelect = false;
    this.xmilSelect = true;
  }
  validateICAPorcentSelect() {
    this.xmilSelect = false;
    this.porcentSelect = true;
  }

  getChecks() {
    document.getElementById("submitFormOculto").click();
  }

  pasarDatos(txt: string) {

    if (txt != "") {
      this.responsabilidades = Array.from(txt.split(","))
      for (let i = 0; i < this.responsabilidades.length; i++) {
        const element = this.responsabilidades[i];
        if (element != "") {
          var num = parseInt(element);;
          switch (num) {
            case 1:
              this.check01 = true;
              break;
            case 2:
              this.check02 = true;
              break;
            case 3:
              this.check03 = true;
              break;
            case 4:
              this.check04 = true;
              break;
            case 5:
              this.check05 = true;
              break;
            case 6:
              this.check06 = true;
              break;
            case 7:
              this.check07 = true;
              break;
            case 8:
              this.check08 = true;
              break;
            case 9:
              this.check09 = true;
              break;
            case 10:
              this.check10 = true;
              break;
            case 13:
              this.check13 = true;
              break;
            case 14:
              this.check14 = true;
              break;
            case 15:
              this.check15 = true;
              break;
            case 16:
              this.check16 = true;
              break;
            case 17:
              this.check17 = true;
              break;
            case 18:
              this.check18 = true;
              break;
            case 19:
              this.check19 = true;
              break;
            case 20:
              this.check20 = true;
              break;
            case 21:
              this.check21 = true;
              break;
            case 22:
              this.check22 = true;
              break;
            case 23:
              this.check23 = true;
              break;
            case 24:
              this.check24 = true;
              break;
            case 26:
              this.check26 = true;
              break;
            case 32:
              this.check32 = true;
              break;
            case 35:
              this.check35 = true;
              break;
            case 36:
              this.check36 = true;
              break;
            case 37:
              this.check37 = true;
              break;
            case 38:
              this.check38 = true;
              break;
            case 39:
              this.check39 = true;
              break;
            case 40:
              this.check40 = true;
              break;
            case 41:
              this.check41 = true;
              break;
            case 42:
              this.check42 = true;
              break;
            case 47:
              this.check47 = true;
              break;
            case 48:
              this.check48 = true;
              break;
            case 49:
              this.check49 = true;
              break;
            case 50:
              this.check50 = true;
              break;
            case 51:
              this.check51 = true;
              break;
            case 52:
              this.check52 = true;
              break;
            default:
              break;
          }
        } else {
          console.log("es nulo");
        }
      }
    }
    if (this.profile.cityrete == "158" || this.profile.cityrete == "1013") {
      this.cityReteICASelect = true;
      this.cityReteICAselect2 = false;
      if (this.profile.reteica != '') {
        if (this.profile.reteica.includes('%')) {
          this.reteICA = true;
          this.porcentSelect = true;
          this.reteICAPor = this.profile.reteica;
        } else {
          this.reteICA = true;
          this.xmilSelect = true;
          this.reteICAXmil = this.profile.reteica;
        }
      }
    } else {
      if (this.profile.reteica != '') {
        if (this.profile.reteica.includes('%')) {
          this.reteICA = true;
          this.porcent = true;
          this.reteICAPor = this.profile.reteica;
        } else {
          this.reteICA = true;
          this.xmil = true;
          this.reteICAXmil = this.profile.reteica;
        }
      }
    }
    if (this.profile.reteiva != '') {
      this.reteIVA = true;
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size < 10485750) {
        this.angForm.get('fileDeal').setValue(file);
        this.fileNameInput = file.name;
        this.filepart = this.uploadFile.split('.');
        this.errorFile = false;
        if (this.filepart[1] == "pdf" || this.filepart[1] == "jepg") {
          this.validation = true;
        } else {
          this.validation = false;
        }
      }
      else {
        swal('Achivo muy grande', 'El archivo que intenta subir es demasiado grande', 'warning');
        this.uploadFile = '';
        this.errorFile = true;
      }
    }
  }

  validateresponsibilities() {
    if (this.check01 == false && this.check02 == false && this.check03 == false && this.check04 == false && this.check05 == false && this.check06 == false && this.check07 == false &&
      this.check08 == false && this.check09 == false && this.check10 == false && this.check13 == false &&
      this.check14 == false && this.check15 == false && this.check16 == false && this.check17 == false && this.check18 == false &&
      this.check19 == false && this.check20 == false && this.check21 == false && this.check22 == false && this.check23 == false && this.check24 == false &&
      this.check26 == false && this.check32 == false && this.check35 == false && this.check36 == false && this.check37 == false &&
      this.check38 == false && this.check39 == false && this.check40 == false && this.check41 == false &&
      this.check42 == false && this.check47 == false && this.check48 == false && this.check49 == false &&
      this.check50 == false && this.check51 == false && this.check52 == false) {
      this.errorBillingResponsabilities = true;
    } else {
      if (this.check01 == true) {
        this.profile.responsabilidadesCode = '01';
      }
      if (this.check02 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',02';
      }
      if (this.check03 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',03';
      }
      if (this.check04 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',04';
      }
      if (this.check05 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',05';
      }
      if (this.check06 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',06';
      }
      if (this.check07 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',07';
      }
      if (this.check08 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',08';
      }
      if (this.check09 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',09';
      }
      if (this.check10 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',10';
      }
      if (this.check13 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',13';
      }
      if (this.check14 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',14';
      }
      if (this.check15 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',15';
      }
      if (this.check16 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',16';
      }
      if (this.check17 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',17';
      }
      if (this.check18 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',18';
      }
      if (this.check19 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',19';
      }
      if (this.check20 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',20';
      }
      if (this.check21 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',21';
      }
      if (this.check22 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',22';
      }
      if (this.check23 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',23';
      }
      if (this.check24 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',24';
      }
      if (this.check26 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',26';
      }
      if (this.check32 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',32';
      }
      if (this.check35 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',35';
      }
      if (this.check36 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',36';
      }
      if (this.check37 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',37';
      }
      if (this.check38 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',38';
      }
      if (this.check39 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',39';
      }
      if (this.check40 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',40';
      }
      if (this.check41 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',41';
      }
      if (this.check42 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',42';
      }
      if (this.check47 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',47';
      }
      if (this.check48 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',48';
      }
      if (this.check49 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',49';
      }
      if (this.check50 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',50';
      }
      if (this.check51 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',51';
      }
      if (this.check52 == true) {
        this.profile.responsabilidadesCode = this.profile.responsabilidadesCode + ',52';
      }
    }
  }

}
