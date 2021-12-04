import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  selectedProducts: any = [];
  totalAmmount: number = 0;

  private procductListSource = new BehaviorSubject([]);
  productList = this.procductListSource.asObservable();

  set addProduct(product: any) {
    let counter: number = 0;

    if (this.selectedProducts.length == 0) {
      this.selectedProducts.push({ product: product, ammount: 1 });
    } else {
      for (let item of this.selectedProducts) {
        if (item.product.id === product.id) {
          item.ammount = item.ammount + 1;
          counter = counter + 1;
        }
      }

      if (counter == 0) {
        this.selectedProducts.push({ product: product, ammount: 1 });
      }
    }
    this.procductListSource.next(this.selectedProducts);
  }

  private productAmmountSource = new BehaviorSubject('');
  productAmmount = this.productAmmountSource.asObservable();

  set addProducts(ammount: number) {
    this.totalAmmount = this.totalAmmount + ammount;
    this.productAmmountSource.next(this.totalAmmount.toString());
  }

  deleteProductById(productId: number, ammount: number) {
    for (let item of this.selectedProducts) {
      if (item.product.id === productId) {
        this.selectedProducts.splice(this.selectedProducts.indexOf(item), 1);

        this.addProducts = ammount;

        break;
      }
    }
    this.procductListSource.next(this.selectedProducts);
  }

  changeAmmountById(productId: number, ammount: number) {
    for (let item of this.selectedProducts) {
      if (item.product.id === productId) {
        if (item.ammount != 0 || ammount != -1) {
          item.ammount = item.ammount + ammount;
          this.addProducts = ammount;
        }
      }
    }
    this.procductListSource.next(this.selectedProducts);
  }

  constructor() {}
}
