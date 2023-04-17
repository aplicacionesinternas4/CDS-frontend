import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Usuario } from "../../model/Usuario";
import { CompanyService } from "../../shared/services/company.service";
import { Router } from "@angular/router";
import { UserAppService } from "../../shared/services/user-app.service";
import { LoginService } from "../../login/login.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  emptyList = false;
  loading = true;
  validation = false;
  validation2 = false;
  validation3 = false;
  undefinedFullNameUser: string = "Nombre de usuario no definido";
  fullNameUser: string = this.undefinedFullNameUser;
  usuarios: Array<Usuario> = new Array<Usuario>();
  profile: any;
  paginado = 200;
  paginadorAnt = 0;
  searchTxt:any;
  desabilitarClick=false;
  searchActive = false;
  contador = 1;

  constructor(public companyService: CompanyService, private cookieService: CookieService, private router: Router,
    private userAppService: UserAppService, private loginService: LoginService) { }

  ngOnInit() {
    this.cookieService.put("shopping-car", null);
    this.userAppService.getUserApp(this.cookieService.get("helisa-user")).subscribe(
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
    this.companyService.getUserByProfile(this.cookieService.get("helisa-user")).subscribe(
      data => {
        this.profile = data;
        this.profile = this.profile._body;
        console.log(this.profile);
        if (this.profile == 1 || this.profile == 2) {
          if (this.profile == 1) {
            this.validation2 = true;
          }
          this.validation3 = true;
          this.companyService.getAllCompanies(200, 0).subscribe(
            data => {
              console.log(data);
              this.validation = false;
              this.usuarios = data;
              this.loading = false;
              if (this.usuarios == null || this.usuarios.length == 0) {
                this.emptyList = true;
              } else {
                this.emptyList = false;
              }
            }
          );
        } else if (this.profile == "3") {
          this.companyService.getCompaniesUser(this.cookieService.get("helisa-user")).subscribe(
            data => {
              this.validation = true;
              this.usuarios = data;
              this.loading = false;
              if (this.usuarios == null || this.usuarios.length == 0) {
                this.emptyList = true;
              } else {
                this.emptyList = false;
              }
            }
          );
        }
        else
          console.log("no entro en profile ");
      }
    );

  }

  selectCompany(usuario) {
    if(this.profile!=2){
      this.setCompanyUser(usuario);
      this.router.navigate(['company/secure']);
    }
    
  }

  logout() {
    this.loginService.logout().subscribe(
      res => { }
    );
    this.cookieService.remove("helisa-token");
    this.cookieService.remove("helisa-user");
    this.cookieService.remove("helisa-oid");
    this.cookieService.remove("helisa-admin");
    this.cookieService.put("shopping-car", null);
    this.router.navigate(['login']);
  }

  goCreatioCompany() {
    this.router.navigate(["company/creation-company"]);
  }

  editCompany(usuario) {
    this.setCompanyUser(usuario);
    this.router.navigate(["company/info"]);
  }

  setCompanyUser(usuario) {
    let date = new Date();
    date.setTime(date.getTime() + 100 * 24 * 60 * 60 * 1000);
    this.cookieService.put('helisa-c-services', usuario.usuario, { expires: date });
  }

  goToEditUserApp() {
    this.router.navigate(["user/info"]);
  }

  seguirPaginado() {
    this.paginado = this.paginado + 200;
    this.paginadorAnt = this.paginado - 200;
    this.loading = true;
    this.companyService.getAllCompanies(this.paginado, this.paginadorAnt).subscribe(
      data => {
        this.usuarios = data;
        this.contador = this.contador+1;
        this.loading = false;
        if (this.usuarios == null || this.usuarios.length == 0) {
          this.emptyList = true;
        } else {
          this.emptyList = false;
        }
      }
    );
  }

  devolverPaginado() {
    if (this.paginado <= 200) {
    } else {
      this.paginado = this.paginado - 200;
      this.paginadorAnt = this.paginado - 200;
      this.loading = true;
      this.companyService.getAllCompanies(this.paginado, this.paginadorAnt).subscribe(
        data => {
          this.usuarios = data;
          this.contador = this.contador-1;
          this.loading = false;
          if (this.usuarios == null || this.usuarios.length == 0) {
            this.emptyList = true;
          } else {
            this.emptyList = false;
          }
        }
      );
    }
  }

  searchCompanyByNit(){
    this.searchTxt;
    console.log(this.searchTxt);
    if(this.searchTxt != ""){
      this.companyService.searchByNit(this.searchTxt).subscribe(
        data=>{
          this.usuarios = data;
          this.contador = 1;
        }
      )
    }
  }

  clean(){
    this.searchTxt = "";
    this.companyService.getAllCompanies(this.paginado, this.paginadorAnt).subscribe(
      data => {
        this.usuarios = data;
        this.contador = 1;
        this.loading = false;
        if (this.usuarios == null || this.usuarios.length == 0) {
          this.emptyList = true;
        } else {
          this.emptyList = false;
        }
      }
    );
  }

  changeValue(){
    if(this.searchTxt == null){
      this.searchActive = false;
      this.companyService.getAllCompanies(this.paginado, this.paginadorAnt).subscribe(
        data => {
          this.usuarios = data;
          this.loading = false;
          if (this.usuarios == null || this.usuarios.length == 0) {
            this.emptyList = true;
          } else {
            this.emptyList = false;
          }
        }
      );
    }else if(this.searchTxt != ""){
      this.searchActive = true;
    }
  }

  goUserEdition() {
    this.router.navigate(["user/edit-Rol"]);
  }

}
