import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from "../../shared/services/usuario.service";
import { CiudadService } from "../../shared/services/ciudad.service";
import { LoginService } from "../../login/login.service";
import { ProfileService } from "../../shared/services/profile.service";
import { ToastService } from "../../shared/services/toast.service";
import { Toast } from "../../model/Toast";
import { TipoDocumento } from "../../model/TipoDocumento";
import { Usuario } from "../../model/Usuario";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { UserAppService } from "../../shared/services/user-app.service";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BillingService } from '../../shared/services/billing.service';
import { Billing } from '../../model/Billing';
import { Files } from '../../model/Files';
import { FilesService } from '../../shared/services/file.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-company-creation',
  templateUrl: './company-creation.component.html',
  styleUrls: ['./company-creation.component.css']
})
export class CompanyCreationComponent implements OnInit {

  regexEmail = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@");
  angForm: FormGroup;

  companyRegistryModel = { 
    name: '', 
    typeDocument: '', 
    numberDocument: '', 
    telephone: '', 
    country: '', 
    city: '', 
    address: '', 
    conditions: false, 
    email: '', 
    regimen: '', 
    ResponsabilidadesCode: '',
    emailRetencion: '',
    reteIca: '',
    reteIva: '',
    cityICA:'',
  };
  uploadFile = '';
  filepart = [];
  xmil=false;
  porcent=false;
  reteIVA = false;
  reteICA = false;
  reteICAXmil = "";
  reteICAPor = "";
  valorXmil = "";
  valorPorcent = "";
  

  errorCity = false;
  errorDocumentType = false;
  errorRegimen = false;
  errorDocumento = false;
  errorCountry = false;
  errorEmail = false;
  errorBillingName = false;
  errorBillingPhone = false;
  errorBillingPosition = false;
  errorBillingEmail = false;
  errorBillingResponsabilities = false;
  errorReteICAVales = false;
  errorFiles = false;

  check01 = false;check02 = false;check03 = false;check04 = false;check05 = false;check06 = false;check07 = false;
  check08 = false;check09 = false;check10 = false;check13 = false;
  check14 = false;check15 = false;check16 = false;check17 = false; check18 = false;
  check19 = false;check20 = false;check21 = false;check22 = false; check23 = false; check24 = false;
  check26 = false;check32 = false;check35 = false;check36 = false; check37 = false;
  check38 = false;check39 = false;check40 = false;check41 = false;
  check42 = false;check47 = false;check48 = false;check49 = false;
  check50 = false;check51 = false;check52 = false;

  conditionRegistryValid = true;
  documentsTypes: Array<TipoDocumento>;
  cities: Array<any>;
  regimens: Array<any>;
  country: Array<any>;
  fileData = { name: '' };
  fileM: Files = new Files();
  selectTypeDocument = "";
  path:"";
  selectCity = "";
  selectRegimen = "";
  selectCountry = "";
  validateEmail = true;
  userbillingName = '';
  userbillingPhone = '';
  userbillingPosition = '';
  user: string = "null";
  userApp = null;
  name:string;
  fileNameInput = '';
  userBilling: Billing = new Billing(null, '', '', '', '', '');
  messageService: any;
  fileMessage: any;
  messageCreation: any;
  com: any;
  router: any;
  validForm: boolean;
  ext:string[];
  validation = true;

  
  selectPorcentICASelect=false;
  selectICABogXm = false;
  selectICABogPor = false;
  selectICACalXm = false;
  selectICACalPor = false;
  textCalR = false;
  porcentSelect = false
  xmilSelect = false;
  selectBogXmil=false;
  selectBogPor=false;
  selectCalXmil=false;
  selectCalPor=false;
  selectValue="";

  selectPorCity=false;
  selectXmilCity=false;
  cityReteICASelect = false;
  cityReteICAselect2 = false;
  datosXmil=["",""];
  datosPor=["",""];
  xmilSelectValue = "";
  porcentSelectValue = "";
  //retenValuesPorcent: Array<any>;
  //retenValuesXmil: string[];

  constructor(private rotuer: Router, private userService: UsuarioService, private ciudadService: CiudadService,
    private loginService: LoginService, private profileService: ProfileService,
    private _toastService: ToastService, private cookieService: CookieService, private userAppService: UserAppService,
    private fb: FormBuilder, private billingService: BillingService, private fileSer: FilesService ) { }

  ngOnInit() {
    this.getService();
    this.userService.getDocumentsType().subscribe(
      data => {
        this.documentsTypes = data;
      }
    );
    this.cities = new Array<any>();

    this.angForm = this.fb.group({
      fileDeal: [''],
      name: ''
    });

    this.profileService.getRegimens().subscribe(
      data => {
        this.regimens = data;
      }
    );

    this.profileService.getPaises().subscribe(
      paises => {
        this.country = paises;
      }
    )
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  getService() {
    this.userAppService.getUserApp(this.cookieService.get('helisa-user')).subscribe(
      user => {
        this.userApp = user;
        this.name = user.name +' '+ user.lastName ;
      }
    );
  }

  emailHasError() {
    return this.validateEmail;
  }
  validateTypeDocument(typeDocument, document) {
    if (typeDocument == 1 || typeDocument == 3 || typeDocument == 6) {
      if (document <= 10 && document >= 8)
        return true;
      else {
        this._toastService.showToast(new Toast(3, "El Documento debe tener minimo 8 caracteres y maximo 10.", true));
        return false;
      }
    } else if (typeDocument == 2) {
      if (document == 9)
        return true;
      else {
        this._toastService.showToast(new Toast(3, "El Nit debe tener exactamente 9 caracteres.", true));
        return false;
      }
    } else if (typeDocument == 5 || typeDocument == 8) {
      if (document <= 9)
        return true;
      else {
        this._toastService.showToast(new Toast(3, "El Documento debe tener maximo 9 caracteres.", true));
        return false;
      }
    } else if (typeDocument == 7) {
      if (document <= 10)
        return true;
      else {
        this._toastService.showToast(new Toast(3, "El Documento debe tener minimo 10 caracteres.", true));
        return false;
      }
    }
  }
  sendCompanyRegistry(companyRegistry) {
    if(this.angForm.get('fileDeal').value != null && this.angForm.get('fileDeal').value != ''){
      const formData = new FormData();
      console.log(this.angForm.get('fileDeal').value);
      formData.append('file', this.angForm.get('fileDeal').value);
      formData.append('name', this.fileData.name);
      formData.append('code', this.companyRegistryModel.numberDocument);
      formData.append('path', '' + this.path);
      formData.append('type', '' + 'Archive');
      console.log(formData);
      this.fileSer.uploadFiles(formData).subscribe(
        dataUpload => {
              console.log(dataUpload);
        }
    );

    }
    var identificacion1 = this.companyRegistryModel.numberDocument.toString();
    if (this.validateTypeDocument(this.companyRegistryModel.typeDocument, identificacion1.length)) {
      this.loginService.validate_Email(this.companyRegistryModel.email).subscribe(
        res => {
          if (res.text() == "false") {
            this.validateEmail = false;
            this.emailHasError();
            this._toastService.showToast(new Toast(3, "__ La dirección de correo electrónico ya se encuentra registrada.", true));
          } else {
            this.validateEmail = true;
            this.emailHasError();
            if (this.companyRegistryModel.numberDocument == '') {
              this.errorDocumento = true;
            } else {
              this.userService.getUsuario(this.companyRegistryModel.numberDocument).subscribe(
                data => {
                  this._toastService.showToast(new Toast(3, "Documento ya se encuentra registrado.", true));
                  this.errorDocumento = true;
                }, (error) => {
                  this.errorDocumento = false;
                  this.userBilling.company = this.companyRegistryModel.numberDocument;
                  if (!this.companyRegistryModel.conditions) {
                    this.conditionRegistryValid = false;
                  }
                  if (this.companyRegistryModel.city == '') {
                    this.errorCity = true;
                  }
                  if (this.companyRegistryModel.typeDocument == '') {
                    this.errorDocumentType = true;
                  }
                  if (this.companyRegistryModel.country == ''){
                    this.errorCountry = true;
                  }
                  if (this.companyRegistryModel.regimen == '') {
                    this.errorRegimen = true;
                  }
                  if(this.regexEmail.test(this.userBilling.email)){
                    this.errorBillingEmail = false;
                  }
                  if(this.userBilling.name == ''){
                    this.errorBillingName = true;
                  }
                  if(this.userBilling.phone == ''){
                    this.errorBillingPhone = true;
                  }
                  if(this.userBilling.position == ''){
                    this.errorBillingPosition = true;
                  }
                  if(this.reteIVA == true){
                    this.companyRegistryModel.reteIva = "15%";
                  }
                  
                  if(this.cityReteICASelect == true){
                    if(this.xmilSelect == true){
                      this.companyRegistryModel.reteIca = this.xmilSelectValue;
                      console.log(this.companyRegistryModel.reteIca);
                      console.log("arriba xmil");
                      this.errorReteICAVales = false;
                    }else if(this.porcentSelect == true){
                      this.companyRegistryModel.reteIca = this.porcentSelectValue;
                      console.log(this.companyRegistryModel.reteIca);
                      console.log("arriba porcent");
                      this.errorReteICAVales = false;
                    }else{
                      console.log("no puede dejar este campo en blanco");
                      this.errorReteICAVales = true;
                    }
                  }else if(this.cityReteICAselect2 == true){
                    if(this.reteICA == true){
                      if(this.xmil == true){
                        this.companyRegistryModel.reteIca = this.valorXmil;
                        this.errorReteICAVales = false;
                      }else if(this.porcent == true){
                        this.companyRegistryModel.reteIca = this.valorPorcent;
                        this.errorReteICAVales = false;
                      }else{
                          console.log("no puede dejar este campo en blanco");
                          this.errorReteICAVales = true;
                      }
                    }
                  }
                  
                  if(this.uploadFile != ''){
                    console.log(this.uploadFile);
                    console.log("arriba esta el file");
                    this.filepart = this.uploadFile.split('.');
                    if(this.filepart[1]=="pdf" || this.filepart[1]== "jepg"){
                      this.errorFiles = false;
                    }else{
                      console.log("archivo no contiene la extencion esperada");
                      swal("Error"," El archivo solo puede ser .pdf o .jpeg","error");
                      this.errorFiles = true;
                    }
                  }else{
                    swal("Error","Por favor agregue un archivo .pdf o .jpeg","error");
                      this.errorFiles = true;
                  }
                  this.validateresponsibilities();
                  if(this.userBilling.company == "")
                  {
                    this.errorDocumentType = true;
                  }
                  if (!this.errorDocumentType && !this.errorCity && this.companyRegistryModel.conditions &&
                    !this.errorRegimen && !this.errorCountry && this.validEmail() && !this.errorBillingName && 
                    !this.errorBillingPhone && !this.errorBillingPosition && !this.errorBillingEmail && !this.errorReteICAVales && !this.errorFiles ) {
                    this.companyRegistryModel.email = this.companyRegistryModel.email.toLowerCase();
                    this.userService.createCompany(this.companyRegistryModel).subscribe(
                      rest => {
                        this._toastService.showToast(new Toast(0, "__ Empresa creada correctamente.", true));
                        console.log("creado correctamente");
                        this.billingService.saveBilling(this.userBilling).subscribe(
                          data=>{
                            console.log("Billign guardado correctamente");
                            console.log("paso a enviar");
                          this.fileSer.sendEmail(this.companyRegistryModel.email,"crear", this.companyRegistryModel.name, this.companyRegistryModel.numberDocument, this.name).subscribe(
                            d =>{
                              console.log("enviando mail");
                              //console.log(d);
                              this.rotuer.navigate(['../company/list']);
                            }
                          ); //this.name
                          }
                        );
                        
                      });
                    console.log("paso el createCompany");
                  }
                  else{
                    swal("Error", "Por favor complete todos los campos", "error");
                    console.log("")
                    console.log("no paso el validate");
                  }
                  
                }
              )
            }
          }
        }
      );
    }
  }


  onSelectTypeDocument(type) {

    this.selectTypeDocument = type.tipo;
    this.companyRegistryModel.typeDocument = type.codigo;
  }

  onSelectRegimen(regimen) {
    this.selectRegimen = regimen.nombre;
    this.companyRegistryModel.regimen = regimen.id;
  }

  onSelectCity(city) {
    this.selectCity = city.nombre + " - " + city.departamento.nombre;
    this.companyRegistryModel.city = city.id;
  }

  onSelectCountry() {//validacion ciudades por pais ys 23-04-2018
    this.ciudadService.getCiudadesByIdCountry(this.companyRegistryModel.country + "").subscribe(
      data => {
        this.cities = data;
      }
    );
  }

  back() {
    this.rotuer.navigate(["../company/list"]);
  }

  calR() {
      if (this.companyRegistryModel.cityICA != "") {
        if (this.companyRegistryModel.cityICA == "158") {
          this.cityReteICASelect = true;
          this.cityReteICAselect2 = false;
          this.datosXmil = ["6,90","9,66"]; 
          this.datosPor = ["0,690 %","0,966 %"];
          this.porcentSelectValue = "0,690 %";
          this.xmilSelect = true;
          this.xmilSelectValue = "6,90";
        }else if(this.companyRegistryModel.cityICA == "10"){
          this.cityReteICASelect = false;
          this.cityReteICAselect2 = true;
          this.valorXmil  = "2,00";
          this.valorPorcent   = "0,200 %";
        }else if(this.companyRegistryModel.cityICA == "1013"){
          this.cityReteICASelect = true;
          this.cityReteICAselect2 = false;
          this.datosXmil = ["6,60","10,00"];
          this.datosPor = ["0,660 %","1,000 %"];
        }else if(this.companyRegistryModel.cityICA == "205"){
          this.cityReteICASelect = false;
          this.cityReteICAselect2 = true;
          this.valorXmil  = "9,00";
          this.valorPorcent   = "0,900 %";
        }else{
          this.cityReteICASelect = false;
          this.cityReteICAselect2 = true;
          this.valorXmil  = "11,04";
          this.valorPorcent   = "1,104 %";
        }
        this.reteICAXmil = this.valorXmil;
        this.reteICAPor = this.valorPorcent;
      }
  }

  save() {
    if(this.validSecondEmail(this.userBilling.email)) {
        this.userBilling.company = this.getUser();
        this.billingService.saveBilling(this.userBilling).subscribe(
          data => {
          }
        )
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size < 10485750) {
      this.angForm.get('fileDeal').setValue(file);
      this.fileNameInput = file.name;
      this.filepart = this.uploadFile.split('.');
      if(this.filepart[1]=="pdf" || this.filepart[1]== "jepg"){
        this.errorFiles = false;
        this.validation=true;
      }else{
        this.validation = false;
      }
    }else{
      swal('Achivo muy grande', 'El archivo que intenta subir es demasiado grande', 'warning');
        this.uploadFile = '';
        this.validation = false;
    }
      //$event('#info').removeClass('text-success').addClass('text-info').text('El archivo solo puede se .pdf o .jpeg');
    }
  }

  validSecondEmail(email){
      return this.regexEmail.test(email);
  }

  validEmail() {
    this.errorEmail = this.regexEmail.test(this.companyRegistryModel.email);
    console.log(this.errorEmail + ' aqui')
    return this.errorEmail;
  } 

  getUser(){
    return this.cookieService.get('helisa-c-services');
  }

  validacionRETE(a){
    if(a == "IVA"){
      //if(document.getElementsByName("checkReteIVA").isCheked
      console.log("esta en IVA");
    }else if(a == "ICA"){
      console.log("esta en ICA");
    }
  }

  validateICAXmil(){
      this.porcent = false;
      this.xmil = true;
  }
  validateICAPorcent(){
      this.xmil = false;
      this.porcent = true;
  }

  validateICAXmilSelect(){
    this.porcentSelect = false;
    this.xmilSelect = true;
    if(this.companyRegistryModel.cityICA == "158"){
      this.selectBogXmil=true;
      this.selectBogPor=false;
    }else if(this.companyRegistryModel.cityICA == "1013"){
      this.selectCalXmil=true;
      this.selectCalPor=false;
    }
}
validateICAPorcentSelect(){
    this.xmilSelect = false;
    this.porcentSelect = true;
    if(this.companyRegistryModel.cityICA == "158"){
      this.selectBogXmil=false;
      this.selectBogPor=true;
    }else if(this.companyRegistryModel.cityICA == "1013"){
      this.selectCalXmil=false;
      this.selectCalPor=true;
    }
}

  validNit() {
  }

  validateresponsibilities(){
    if(this.check01 == false && this.check02 == false && this.check03 == false && this.check04 == false && this.check05 == false && this.check06 == false && this.check07 == false &&
      this.check08 == false && this.check09 == false && this.check10 == false && this.check13 == false &&
      this.check14 == false && this.check15 == false && this.check16 == false && this.check17 == false && this.check18 == false &&
      this.check19 == false && this.check20 == false && this.check21 == false && this.check22 == false && this.check23 == false && this.check24 == false&&
      this.check26 == false && this.check32 == false && this.check35 == false && this.check36 == false && this.check37 == false &&
      this.check38 == false && this.check39 == false && this.check40 == false && this.check41 == false &&
      this.check42 == false && this.check47 == false && this.check48 == false && this.check49 == false &&
      this.check50 == false && this.check51 == false && this.check52 == false){
        this.errorBillingResponsabilities = true;
      }else{
        if(this.check01 == true){
          this.companyRegistryModel.ResponsabilidadesCode = '01';
        }
        if(this.check02 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',02';
        }
        if(this.check03 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',03';
        }
        if(this.check04 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',04';
        }
        if(this.check05 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',05';
        }
        if(this.check06 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',06';
        }
        if(this.check07 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',07';
        }
        if(this.check08 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',08';
        }
        if(this.check09 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',09';
        }
        if(this.check10 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',10';
        }
        if(this.check13 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',13';
        }
        if(this.check14 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',14';
        }
        if(this.check15 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',15';
        }
        if(this.check16 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',16';
        }
        if(this.check17 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',17';
        }
        if(this.check18 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',18';
        }
        if(this.check19 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',19';
        }
        if(this.check20 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',20';
        }
        if(this.check21 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',21';
        }
        if(this.check22 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',22';
        }
        if(this.check23 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',23';
        }
        if(this.check24 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',24';
        }
        if(this.check26 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',26';
        }
        if(this.check32 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',32';
        }
        if(this.check35 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',35';
        }
        if(this.check36 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',36';
        }
        if(this.check37 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',37';
        }
        if(this.check38 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',38';
        }
        if(this.check39 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',39';
        }
        if(this.check40 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',40';
        }
        if(this.check41 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',41';
        }
        if(this.check42 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',42';
        }
        if(this.check47 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',47';
        }
        if(this.check48 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',48';
        }
        if(this.check49 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',49';
        }
        if(this.check50 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',50';
        }
        if(this.check51 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',51';
        }
        if(this.check52 == true){
          this.companyRegistryModel.ResponsabilidadesCode = this.companyRegistryModel.ResponsabilidadesCode + ',52';
        }
        this.errorBillingResponsabilities = false;
      }
  }

  
}
