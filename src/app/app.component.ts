import { Component } from '@angular/core';
import {ToastService} from "./shared/services/toast.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Centro de Servicios Helisa!';
  private toast = false;
  private toastMessage : string = "";
  private toastType : number = 0;

  constructor(private _toastService : ToastService) {
    this.showToast();
  }

  showToast(){
    this._toastService.onToastObservable.subscribe(
      toast => {
        this.toast = toast.getEnabled();
        this.toastMessage = toast.getMessage();
        this.toastType = toast.getType();
      }
    )
  }
}
