import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: any = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      res => this.products = res,
      err => console.log(err))
  }

}
