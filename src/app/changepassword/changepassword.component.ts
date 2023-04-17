import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ChangepasswordserviceService } from './changepasswordservice.service';
import { CookieService } from 'angular2-cookie/core';
import {UsuarioService} from "../shared/services/usuario.service";
import { DOCUMENT } from '@angular/platform-browser';
import {ToastService} from "../shared/services/toast.service";
import {Toast} from "../model/Toast";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  private recoveryModel = {username:'', password:'', passwordConfirm:'', currentpassword:''};
  private recoveryError="";
  constructor(private route: ActivatedRoute, private changepservice:ChangepasswordserviceService, private router  : Router, private cookieService: CookieService,
    private userService: UsuarioService, private toast: ToastService) {
      
}
ngOnInit() {
 

}

  sendRecovery() {
    if(this.recoveryModel.password!=this.recoveryModel.passwordConfirm){
      this.recoveryError = "Las contraseñas no coinciden";
    } 
    else { 
        this.recoveryError = "";
        this.recoveryModel.username = this.cookieService.get("helisa-user");
        this.changepservice.sendRecovery(this.recoveryModel).subscribe(
          () => {
            document.getElementById("btn-ocultarp").click();
            this.logout();
          },
          error => {
            this.recoveryError = "Ocurrio un error, intentelo de nuevo";
          }
          
        );  
    }
  }
  logout() {
    this.changepservice.logout().subscribe(
      res =>{}
    );
    this.cookieService.remove("helisa-token");
    this.cookieService.remove("helisa-user");
    this.cookieService.remove("helisa-oid");
    this.cookieService.remove("helisa-admin");
    this.cookieService.put("shopping-car",null);
    this.router.navigate(['login']);
  }
}
