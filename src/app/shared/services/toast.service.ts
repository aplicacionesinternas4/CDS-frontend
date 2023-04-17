/**
 * Created by Dixon Medina on 12/12/2016.
 */
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Toast} from "../../model/Toast";

@Injectable()
export class ToastService{

  public onToastObservable : Observable<Toast>;
  private onToastSuject : Subject<Toast>;
  private toast : Toast;
  constructor(){
    this.onToastSuject = new Subject<Toast>();
    this.onToastObservable = this.onToastSuject.asObservable();
  }

  showToast(toast : Toast){
    this.toast = toast;
    this.onToastSuject.next(toast);
    this.closeToast(6000);
  }

  closeToast(ms?:number){
    Observable.timer(ms?ms:10).subscribe(t=> {
      this.toast.setEnabled();
      this.onToastSuject.next(this.toast);
    });

  }
}
