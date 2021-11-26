import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  selectedProducts: any = []
    
  private procductListSource = new BehaviorSubject([]);
  productList = this.procductListSource.asObservable();

  set addProduct(product: any) {
    let counter: number = 0

    if (this.selectedProducts.length == 0) {
      this.selectedProducts.push({product: product, ammount: 1})
    } else {
    
      for (let item of this.selectedProducts) {
        if (item.product.id === product.id) {
          item.ammount = item.ammount+ 1;
          counter = counter + 1
        } 
      }

      if (counter == 0){
        this.selectedProducts.push({product: product, ammount: 1})
      }
  }
    this.procductListSource.next(this.selectedProducts)
  }

  resetList() {
    this.selectedProducts = []
  }

  

  constructor() {}
}
