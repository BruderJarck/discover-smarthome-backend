import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  selectedProducts: any = [];
  totalAmmount: number = 0;
    
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


  private productAmmountSource = new BehaviorSubject("");
  productAmmount = this.productAmmountSource.asObservable()

  set addProducts(ammount: number) {
    this.totalAmmount = this.totalAmmount + ammount;
    if (this.totalAmmount > 0) {
      if (this.totalAmmount <= 99) {
        this.productAmmountSource.next(this.totalAmmount.toString())
      } else if (this.totalAmmount > 99) {
        this.productAmmountSource.next("99+")
      } else if (this.totalAmmount == 0) {
        this.totalAmmount = 0
        this.productAmmountSource.next("0")
      }
    }
}

  constructor() {}
}
