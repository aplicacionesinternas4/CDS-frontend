import { Component, OnInit } from '@angular/core';
import {ToastService} from "../shared/services/toast.service";
import {SettingService} from "../shared/services/setting.service";
import {Constants} from "../shared/Constants";



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private settingService : SettingService) {
  }

  ngOnInit() {
    this.settingService.getSetting("iva").subscribe(
      data=>{
        Constants.setIVA(+data.value);

      }
    );
  }

}
