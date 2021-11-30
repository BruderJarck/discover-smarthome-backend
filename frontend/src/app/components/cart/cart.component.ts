import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: any = []

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.productList.subscribe((item: any) => {
      this.items = [...item]
    })
  }
}
