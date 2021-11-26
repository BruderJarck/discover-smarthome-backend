import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../../product'
import { SharedService } from 'src/app/shared/shared.service';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product?: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public sharedService: SharedService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.productService.getProduct(id).subscribe(res => this.product = res, err => console.log(err))
  }

  onCollect() {
    this.sharedService.addProduct = this.product
  }
}
