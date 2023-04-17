import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { AuditCompany } from '../../../model/AuditCompany';
import { Ciudad } from '../../../model/Ciudad';
import { Departamento } from '../../../model/Departamento';
import { Pais } from '../../../model/Pais';
import { Regimen } from '../../../model/Regimen';
import { TipoDocumento } from '../../../model/TipoDocumento';
import { Usuario } from '../../../model/Usuario';
import { CiudadService } from '../../../shared/services/ciudad.service';
import { CompanyService } from '../../../shared/services/company.service';
import { ProfileService } from '../../../shared/services/profile.service';
import { UserAppService } from '../../../shared/services/user-app.service';

@Component({
  selector: 'app-histories-changes',
  templateUrl: './histories-changes.component.html',
  styleUrls: ['./histories-changes.component.css']
})
export class HistoriesChangesComponent implements OnInit {

  use: Usuario[] = [];
  profile: Usuario = new Usuario('', new TipoDocumento(0, '', ''), '', '', '', null, '', '', '', '', '', '', '', '', '', null,
    '', new Ciudad(0, '', new Departamento(0, ''),    /*new Pais(0,'',''),*/ ''), new Pais(0, '', ''), '', '', new Regimen(0, '', ''), '', '', '', '', '', '', '');// new Pais(0,'',''), ys 23-04-2018

  undefinedFullNameUser: string = "Nombre de usuario no definido";
  fullNameUser: string = this.undefinedFullNameUser;
  loading = false;
  loading2 = false;
  emptyList = false;
  emptyList2 = false;
  audit: Array<AuditCompany> = new Array<AuditCompany>();
  ciudades : Array<Ciudad> = new Array<Ciudad>();
  auditoria: AuditCompany[];
  camposs = [{ campo: '', antes: '', ahora: '', fecha:''}];
  fechaModificacion: any;
  ciudadesnombres=[{id: 0, nombre:''}];

  constructor(
    private service: ProfileService, private cookie: CookieService, private companyService: CompanyService,
    private router: Router, private userAppService: UserAppService, private ciudadService: CiudadService
  ) { }

  ngOnInit() {
    let user = this.getUser();
    this.service.getProfile(user);
    this.getService(); 
    this.ciudadService.getCiudades().subscribe(
      data=>{
        this.ciudades = data;
        for(let city of this.ciudades){
          this.ciudadesnombres.push({id:city.id, nombre:city.nombre});
        }
      }
    );
    this.userAppService.getUserApp(this.cookie.get("helisa-user")).subscribe(
      data => {
        if (data != null) {
          this.fullNameUser = data.name + ' ' + data.lastName;
        } else {
          this.fullNameUser = this.undefinedFullNameUser;
        }
      },
      error => {
        this.fullNameUser = this.undefinedFullNameUser;
      }
    );
    this.getAllHistories();
    this.loading = true;
  }

  getService() {
    this.service.profileObservable.subscribe(
      profile => {
        this.profile = profile
      }
    );
  }

  getUser() {
    return this.cookie.get('helisa-c-services');
  }

  getAllHistories() {

    this.companyService.getAllAudit(this.cookie.get("helisa-c-services"))
      .subscribe(
        data => {
          this.loading = false;
          if (data != null || data != undefined) {
            this.audit = data;
            this.emptyList = false;
          } else {
            this.emptyList = true;
          }
        }
      )
  }

  back() {
    this.router.navigate(["../company/info"]);
  }

  selectauditoria(auditoria) {
    this.dataModification(auditoria);
  }

  dataModification(auditoria: AuditCompany) {
    this.fechaModificacion = auditoria.fechaAuditoria;
    this.camposs = [{ campo: '', antes: '', ahora: '', fecha:''}];
    let fechaMayor: Date;
    let fechaString: any;
    let fechaAudi: Date;
    let fechaAudiString: any;
    let currentData = false;
    for (let b of this.audit) {
      if (new Date(b.fechaAuditoria) > new Date(auditoria.fechaAuditoria)) {
        fechaMayor = new Date(b.fechaAuditoria)  //.toDateString(); 
        fechaString = fechaMayor.toDateString();
        fechaString += " " + fechaMayor.getHours();
        fechaString += ":" + fechaMayor.getMinutes();
        fechaString += ":" + fechaMayor.getSeconds();
      } else if (fechaMayor == undefined || fechaString == undefined) {
        if (fechaMayor == undefined || fechaString == undefined) {
          this.comparisonWithCurrentData(auditoria);
          currentData = true;
        }
        break;
      }
    }
    if(currentData ==false) {
      for (let a of this.audit) {
        fechaAudi = new Date(a.fechaAuditoria);
        fechaAudiString = fechaAudi.toDateString();
        fechaAudiString += " " + fechaAudi.getHours();
        fechaAudiString += ":" + fechaAudi.getMinutes();
        fechaAudiString += ":" + fechaAudi.getSeconds();

        if (fechaString == fechaAudiString) {
          if (auditoria.apellido1 != a.apellido1) {
            this.camposs.push({ campo: '1er apellido', antes: auditoria.apellido1, ahora: a.apellido1, fecha:a.fechaAuditoria });
          }
          if (auditoria.apellido2 != a.apellido2) {
            this.camposs.push({ campo: '2do apellido', antes: auditoria.apellido2, ahora: a.apellido2, fecha:a.fechaAuditoria });
          }
          if (auditoria.celular != a.celular) {
            this.camposs.push({ campo: 'Celular', antes: auditoria.celular, ahora: a.celular, fecha:a.fechaAuditoria });
          }
          if (auditoria.cityrete != a.cityrete) {
            let ciudadAntes;
            let ciudadAhora;
            for(let cityName of this.ciudadesnombres){
              if(cityName.id+"" == auditoria.cityrete){
                ciudadAntes = cityName.nombre;
              }
              if(cityName.id +"" == a.cityrete){
                ciudadAhora = cityName.nombre;
              }
            }
            this.camposs.push({ campo: 'Ciudad Retenciones', antes: ciudadAntes + "", ahora: ciudadAhora + "", fecha:a.fechaAuditoria });
          }
          if (auditoria.direccion != a.direccion) {
            this.camposs.push({ campo: 'Direccion', antes: auditoria.direccion, ahora: a.direccion, fecha:a.fechaAuditoria });
          }
          if (auditoria.email != a.email) {
            this.camposs.push({ campo: 'Email', antes: auditoria.email, ahora: a.email, fecha:a.fechaAuditoria });
          }
          if (auditoria.emailRetencion != a.emailRetencion) {
            this.camposs.push({ campo: 'Email de Retenciones', antes: auditoria.emailRetencion, ahora: a.emailRetencion, fecha:a.fechaAuditoria });
          }
          if (auditoria.empresa != a.empresa) {
            this.camposs.push({ campo: 'Empresa', antes: auditoria.empresa, ahora: a.empresa, fecha:a.fechaAuditoria });
          }
          if (auditoria.id_ciudad != a.id_ciudad) {
            let ciudadAntes;
            let ciudadAhora;
            for(let cityName of this.ciudadesnombres){
              if(cityName.id == auditoria.id_ciudad){
                ciudadAntes = cityName.nombre;
              }
              if(cityName.id == a.id_ciudad){
                ciudadAhora = cityName.nombre;
              }
            }
            this.camposs.push({ campo: 'Ciudad', antes: ciudadAntes + "", ahora: ciudadAhora + "", fecha:a.fechaAuditoria });
          }
          if (auditoria.id_pais != a.id_pais) {
            this.camposs.push({ campo: 'Pais', antes: auditoria.id_pais + "", ahora: a.id_pais + "", fecha:a.fechaAuditoria });
          }
          //if (auditoria.id_regimen != a.id_regimen) {
          //  this.camposs.push({ campo: 'Regimen', antes: auditoria.id_regimen + "", ahora: a.id_regimen + "", fecha:a.fechaAuditoria });
          //}
          if (auditoria.nit != a.nit) {
            this.camposs.push({ campo: 'nit', antes: auditoria.nit, ahora: a.nit, fecha:a.fechaAuditoria });
          }
          if (auditoria.nombre1 != a.nombre1) {
            this.camposs.push({ campo: '1er nombre', antes: auditoria.nombre1, ahora: a.nombre1, fecha:a.fechaAuditoria });
          }
          if (auditoria.nombre2 != a.nombre2) {
            this.camposs.push({ campo: '2do nombre', antes: auditoria.nombre2, ahora: a.nombre2, fecha:a.fechaAuditoria });
          }
          //if (auditoria.regimen != a.regimen) {
          //  this.camposs.push({ campo: 'Regimen', antes: auditoria.regimen, ahora: a.regimen, fecha:a.fechaAuditoria });
          //}
          if (auditoria.responsabilidadesCode != a.responsabilidadesCode) {
            this.camposs.push({ campo: 'Responsabilidades', antes: auditoria.responsabilidadesCode, ahora: a.responsabilidadesCode, fecha:a.fechaAuditoria });
          }
          if (auditoria.reteIca != a.reteIca) {
            let campoAntes: any;
            let campoAhora: any;
            if (auditoria.reteIca != "") {
              campoAntes = auditoria.reteIca;
            } else {
              campoAntes = "Inactivo";
            }
            if (a.reteIca != "") {
              campoAhora = a.reteIca;
            } else {
              campoAhora = "Inactivo";
            }
            this.camposs.push({ campo: 'Retencion ICA', antes: campoAntes, ahora: campoAhora, fecha:a.fechaAuditoria });
          }
          if (auditoria.reteIva != a.reteIva) {
            let campoAntes: any;
            let campoAhora: any;
            if (auditoria.reteIva != "") {
              campoAntes = "Activo";
            } else {
              campoAntes = "Inactivo";
            }
            if (a.reteIva != "") {
              campoAhora = "Activo";
            } else {
              campoAhora = "Inactivo";
            }
            this.camposs.push({ campo: 'Retencion IVA', antes: campoAntes, ahora: campoAhora, fecha:a.fechaAuditoria });
          }
          if (auditoria.telefono != a.telefono) {
            this.camposs.push({ campo: 'telefono', antes: auditoria.telefono, ahora: a.telefono, fecha:a.fechaAuditoria });
          }
          if (auditoria.tipo_documento != a.tipo_documento) {
            this.camposs.push({ campo: 'tipo documento', antes: auditoria.tipo_documento + "", ahora: a.tipo_documento + "", fecha:a.fechaAuditoria });
          }

        }
      }
    }
  }

  comparisonWithCurrentData(auditoria: AuditCompany) {
    let a = this.profile;

    if (auditoria.apellido1 != a.apellido1) {
      this.camposs.push({ campo: '1er apellido', antes: auditoria.apellido1, ahora: a.apellido1, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.apellido2 != a.apellido2) {
      this.camposs.push({ campo: '2do apellido', antes: auditoria.apellido2, ahora: a.apellido2, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.celular != a.celular) {
      this.camposs.push({ campo: 'Celular', antes: auditoria.celular, ahora: a.celular, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.cityrete != a.cityrete) {
      this.camposs.push({ campo: 'Ciudad Retenciones', antes: auditoria.cityrete, ahora: a.cityrete, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.direccion != a.direccion) {
      this.camposs.push({ campo: 'Direccion', antes: auditoria.direccion, ahora: a.direccion , fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.email != a.email) {
      this.camposs.push({ campo: 'Email', antes: auditoria.email, ahora: a.email, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.emailRetencion != a.emailretencion) {
      this.camposs.push({ campo: 'Email de Retenciones', antes: auditoria.emailRetencion, ahora: a.emailretencion, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.empresa != a.empresa) {
      this.camposs.push({ campo: 'Empresa', antes: auditoria.empresa, ahora: a.empresa, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.id_ciudad != a.ciudadObj.id) {
      let ciudadAntes;
      let ciudadAhora;
      for(let cityName of this.ciudadesnombres){
        if(cityName.id == auditoria.id_ciudad){
          ciudadAntes = cityName.nombre;
        }
        if(cityName.id == a.ciudadObj.id){
          ciudadAhora = cityName.nombre;
        }
      }
      this.camposs.push({ campo: 'Ciudad', antes: ciudadAntes + "", ahora: ciudadAhora + "", fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.id_pais != a.paisObj.id) {
      this.camposs.push({ campo: 'Pais', antes: auditoria.id_pais + "", ahora: a.paisObj.id + "", fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.nit != a.nit) {
      this.camposs.push({ campo: 'nit', antes: auditoria.nit, ahora: a.nit, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.nombre1 != a.nombre1) {
      this.camposs.push({ campo: '1er nombre', antes: auditoria.nombre1, ahora: a.nombre1, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.nombre2 != a.nombre2) {
      this.camposs.push({ campo: '2do nombre', antes: auditoria.nombre2, ahora: a.nombre2, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.responsabilidadesCode != a.responsabilidadesCode) {
      this.camposs.push({ campo: 'Responsabilidades', antes: auditoria.responsabilidadesCode, ahora: a.responsabilidadesCode, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.reteIca != a.reteica) {
      let campoAntes: any;
      let campoAhora: any;
      if (auditoria.reteIca != "") {
        campoAntes = auditoria.reteIca;
      } else {
        campoAntes = "Inactivo";
      }
      if (a.reteica != "") {
        campoAhora = a.reteica;
      } else {
        campoAhora = "Inactivo";
      }
      this.camposs.push({ campo: 'Retencion ICA', antes: campoAntes, ahora: campoAhora, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.reteIva != a.reteiva) {
      let campoAntes: any;
      let campoAhora: any;
      if (auditoria.reteIva != "") {
        campoAntes = "Activo";
      } else {
        campoAntes = "Inactivo";
      }
      if (a.reteiva != "") {
        campoAhora = "Activo";
      } else {
        campoAhora = "Inactivo";
      }
      this.camposs.push({ campo: 'Retencion IVA', antes: campoAntes, ahora: campoAhora, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.telefono != a.telefono) {
      this.camposs.push({ campo: 'telefono', antes: auditoria.telefono, ahora: a.telefono, fecha:auditoria.fechaAuditoria });
    }
    if (auditoria.tipo_documento != a.tipoDocumentoObj.codigo) {
      this.camposs.push({ campo: 'tipo documento', antes: auditoria.tipo_documento + "", ahora: a.tipoDocumentoObj.codigo + "", fecha:auditoria.fechaAuditoria });
    }


  }

}
