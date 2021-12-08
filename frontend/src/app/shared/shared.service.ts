import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  selectedProducts: any = [];
  totalAmmount: number = 0;

  private procductListSource = new BehaviorSubject([]);
  productList = this.procductListSource.asObservable();

  private productAmmountSource = new BehaviorSubject('');
  productAmmount = this.productAmmountSource.asObservable();

  constructor(private _snackBar: MatSnackBar) {}

  addProduct(product: any) {
    let counter: number = 0;

    if (this.selectedProducts.length == 0) {
      this.selectedProducts.push({ product: product, ammount: 1 });
    } else {
      for (let item of this.selectedProducts) {
        if (item.product.id === product.id) {
          this.changeAmmountById(product.id, 1);
          counter = counter + 1;
        }
      }

      if (counter == 0) {
        this.selectedProducts.push({ product: product, ammount: 1 });
      }
    }
    this.procductListSource.next(this.selectedProducts);
  }

  deleteProductById(productId: number, ammount: number) {
    for (let item of this.selectedProducts) {
      if (item.product.id === productId) {
        this.selectedProducts.splice(this.selectedProducts.indexOf(item), 1);
        break;
      }
    }
    this.procductListSource.next(this.selectedProducts);
    this.calcTotalAmmount();
  }

  changeAmmountById(productId: number, ammount: number) {
    for (let item of this.selectedProducts) {
      if (item.product.id === productId) {
        if (ammount === 1 || ammount === -1) {
          let check = item.ammount + ammount;

          if (check > 0 && check < 101) {
            item.ammount = item.ammount + ammount;
            this._snackBar.dismiss();
          } else {
            let duration = 1 * 1000;
            this._snackBar.open('Ungültiger Wert', undefined, {
              duration: duration,
            });
          }
        } else {
          if (ammount > 0 && ammount < 101) {
            item.ammount = Number(ammount);
            this._snackBar.dismiss();
          } else {
            this._snackBar.open('Ungültiger Wert, nur 1-100 möglich');
          }
        }
      }
    }
    this.procductListSource.next(this.selectedProducts);
    this.calcTotalAmmount();
  }

  calcTotalAmmount() {
    this.totalAmmount = 0;
    for (let item of this.selectedProducts) {
      this.totalAmmount = this.totalAmmount + item.ammount;
    }
    if (this.totalAmmount > 99) {
      this.productAmmountSource.next('99+');
    } else {
      this.productAmmountSource.next(this.totalAmmount.toString());
    }
  }
}
