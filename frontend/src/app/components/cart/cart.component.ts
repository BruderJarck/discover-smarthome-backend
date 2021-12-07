import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: any = [];
  
  totalPrice: number = 0
  mwst: number = 0.24 //in %
  workCost: number = 120 //in €
  totalItems: number = 0
  totalItemsBaseCost: number = 0
  shipCost: number = 78 //in €

  constructor(public sharedService: SharedService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.sharedService.productList.subscribe((item: any) => {
      this.items = [...item];

      this.calcPrice();
    });
  }

  removeItem(e: any) {
    let id = e.product.id;
    let ammount = e.ammount;
    this.sharedService.deleteProductById(id, -ammount);
  }

  changeAmmount(eid: any, who: string, e: any) {
    let val = Number(e.srcElement.value)
    let id = eid.product.id;
    let ammount = eid.ammount
    
    if (val >= 1 && val && val <=100) {
      this.sharedService.changeTotalAmmountById(id, val)
    } else if (who == 'add' && ammount < 100) {
      this.sharedService.changeAmmountById(id, 1);
    } else if (who == 'sub' && ammount > 1){
      this.sharedService.changeAmmountById(id, -1);
    } else {
      let duration = 1 * 1000
      this._snackBar.open('Ungültiger Wert', undefined, {"duration": duration});
    }
  }

  calcPrice() {
    this.totalItems = 0
    this.totalPrice = 0
    this.totalItemsBaseCost = 0

    for (let item of this.items) { 
      this.totalItemsBaseCost = this.totalItemsBaseCost + (item.ammount * ( item.product.price + 0.99))
      this.totalItems = this.totalItems + item.ammount
    }
    
    this.totalPrice = this.totalItemsBaseCost + (this.mwst * this.totalItemsBaseCost) + this.workCost + (this.shipCost * this.totalItems)
  }
}
