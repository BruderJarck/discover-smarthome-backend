import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: any = [];

  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.productList.subscribe((item: any) => {
      this.items = [...item];
    });
  }

  removeItem(e: any) {
    let id = e.product.id;
    let ammount = e.ammount;
    this.sharedService.deleteProductById(id, -ammount);
  }

  changeAmmount(e: any, who: string) {
    let id = e.product.id;

    if (who == 'add') {
      this.sharedService.changeAmmountById(id, 1);
    } else {
      this.sharedService.changeAmmountById(id, -1);
    }
  }
}
