import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Login } from '../nav/nav.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: any = [];

  totalPrice: number = 0;
  mwst: number = 0.24; //in %
  workCost: number = 120; //in €
  totalItems: number = 0;
  totalItemsBaseCost: number = 0;
  shipCost: number = 78; //in €
  show_dialog: boolean = false

  constructor(
    public sharedService: SharedService,
    public dialog: MatDialog
    ) {}

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

  changeAmmount(e: any, who: string, input: any) {
    let id = e.product.id;

    if (who == 'neut') {
      this.sharedService.changeAmmountById(id, input.target.value);
    } else if (who == 'add') {
      this.sharedService.changeAmmountById(id, 1);
    } else if (who == 'sub') {
      this.sharedService.changeAmmountById(id, -1);
    }
  }

  calcPrice() {
    this.totalItems = 0;
    this.totalPrice = 0;
    this.totalItemsBaseCost = 0;

    for (let item of this.items) {
      this.totalItemsBaseCost =
        this.totalItemsBaseCost + item.ammount * (item.product.price + 0.99);
      this.totalItems = this.totalItems + item.ammount;
    }

    this.totalPrice =
      this.totalItemsBaseCost +
      this.mwst * this.totalItemsBaseCost +
      this.workCost +
      this.shipCost * this.totalItems;
  }

  openDialog() {
    const dialogRef = this.dialog.open(loginOrAsGuestDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'login-or-as-guest-dialog',
  templateUrl: 'loginOrAsGuestDialog.html',
})
export class loginOrAsGuestDialog {
  imgSrc = localStorage.getItem("profile_pic") || "assets/default_avatar.png"
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private shared: SharedService,
  ){}
  
  ngOnInit(){
    this.imgSrc = localStorage.getItem("profile_pic") || ""
  }
  login(){
    localStorage.setItem('routeAfterLogin', '/checkout')
    const dialogRef = this.dialog.open(Login);

    

    this.shared.loginFailed.subscribe(res => {
      if(res == false){
        this.router.navigateByUrl('/checkout')
        this.dialog.closeAll()
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // this.router.navigateByUrl("/checkout")
      // this.dialog.closeAll()
    });

  
  
  }

  asGuest(){

  }
}