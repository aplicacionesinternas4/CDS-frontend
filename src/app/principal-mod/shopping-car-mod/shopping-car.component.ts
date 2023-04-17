import {Component, OnInit, Input} from '@angular/core';
import {ShoppingCarService} from "./shopping-car-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {

  @Input("isPopup") popup: boolean = false;

  showPopup: boolean = false;

  constructor(private shoppingCarService: ShoppingCarService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.shoppingCarService.onShowPopupShoppingCar.subscribe(
        (showPopup: boolean) => {
          this.showPopup = showPopup;
        }
    );
  }

  onClickShoppingCar(){
    if(this.haveProductsCar()) {
      this.closePopup();
      this.router.navigate(["/company/secure/steps-payment"]);
    }
  }

  deleteServiceIndex(index : number){
    this.shoppingCarService.deleteService(index);
  }

  goToStepsPayment(){
    this.router.navigate(['steps-payment']);
  }

  closePopup(){
    if(this.popup){
      this.showPopup = !this.showPopup;
    }
  }

  haveProductsCar(){
    return this.shoppingCarService.total>0;
  }


  focusOut(){

  }
}
