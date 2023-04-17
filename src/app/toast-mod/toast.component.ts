import {Component, OnInit, Input} from '@angular/core';
import {ToastService} from "../shared/services/toast.service";
import {Toast} from "../model/Toast";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input('type') type: number;
  @Input('message') message: string;

  private classAlert : Array<string> = ["alert alert-success fade in", "alert alert-info fade in","alert alert-warning fade in","alert alert-danger fade in"];

  constructor(private _toastService : ToastService) {
  }

  ngOnInit() {
  }

  getClass(){
    return this.classAlert[this.type];
  }

  disable(){
    this._toastService.closeToast();
  }

}
