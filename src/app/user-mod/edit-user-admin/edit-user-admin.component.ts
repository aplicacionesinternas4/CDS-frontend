import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {TipoDocumento} from "../../model/TipoDocumento";
import {LoginService} from "../../login/login.service";
import {UsuarioService} from "../../shared/services/usuario.service";
import {Roles} from "../../model/Roles";
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './edit-user-admin.component.html',
  styleUrls: ['./edit-user-admin.component.css']
})
export class EditUserAdminComponent implements OnInit {
  user : string  = "null";
  typeDocument="";
  documentsTypes : Array<TipoDocumento>;
  regexEmail= new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
  
  constructor(private userService:UsuarioService, 
    private router : Router, private loginService:LoginService, private cookie : CookieService,
    ) { }

  roles:Roles[];
  response:any;
  validateCode:any;
  userRegistrationRol ={
    typeDocument:'',
    email:'',
    identification:'',
    rol:'',
    idRol: '',
  };

  ngOnInit() {
    this.getTiposDocumento();
    this.getTiposRol();
  }


  getTiposDocumento(){
  	this.userService.getDocumentsType().subscribe(
      data =>{
        this.documentsTypes = data;
      }
    );
  }

  getTiposRol(){
    this.userService.getRolUser().subscribe(
      data =>{
        this.roles = data;
        console.log(this.roles);
      }
    )
  }

  sendChangeRol(){

    if(this.userRegistrationRol.rol != "" && this.userRegistrationRol.email != "" && this.userRegistrationRol.identification != "" 
    && this.userRegistrationRol.typeDocument != ""){
      if(this.userRegistrationRol.rol == "Administrador")
        this.userRegistrationRol.idRol = "1";
      if(this.userRegistrationRol.rol == "Gerente")
        this.userRegistrationRol.idRol = "2";
      if(this.userRegistrationRol.rol == "Empresas")
        this.userRegistrationRol.idRol = "3";
      if(this.userRegistrationRol.idRol != ""){
        if(this.regexEmail.test(this.userRegistrationRol.email)){
          this.userService.validateUser(this.userRegistrationRol.email, this.userRegistrationRol.identification).subscribe(
            data=>{
              this.validateCode = data;
              this.validateCode = this.validateCode._body;
              if(this.validateCode == "1"){
                swal("Error","No se encuentran usuarios con estos datos, por favor verifique los datos","error");
              }else if(this.validateCode == "2"){
                swal("Error","Ocurrio un error inesperado, por favor vuelva a intentarlo","error");
              }else if(this.validateCode == "0"){
                this.userService.saveEditRol(this.userRegistrationRol).subscribe(
                  data=>{
                    this.response = data;
                    this.response = this.response._body;
                    if(this.response == 1){
                      console.log("Guardado con exito");
                      swal("Guardado con Exito","El rol del usuario ha sido actualizado con exito","success");
                      this.userRegistrationRol.email="";
                      this.userRegistrationRol.idRol="";
                      this.userRegistrationRol.identification ="";
                      this.userRegistrationRol.typeDocument = "";
                      this.userRegistrationRol.rol = "";
                    }else{
                      swal("Error","No se pudo guardar, por favor verifique los datos","error");
                    }
                  },
                  error=>{
                    console.log("Ocurrio un error inesperado");
                    swal("Error","Ocurrio un error inesperado, por favor, vuelva a intentarlo mas tarde","error");
                  }
                )
              }
            }
          )
        }else{
          console.log("Error en el mail")
        }
      }else{
        console.log("Error en la identidad del Rol")
      }
      
    }
  }

  back(){
    this.router.navigate(['company/list']);
  }

  logout() {
    this.loginService.logout().subscribe(
      res =>{}
    );
    this.cookie.remove("helisa-token");
    this.cookie.remove("helisa-user");
    this.cookie.remove("helisa-oid");
    this.cookie.remove("helisa-admin");
    this.cookie.put("shopping-car",null);
    this.router.navigate(['login']);
  }
}
