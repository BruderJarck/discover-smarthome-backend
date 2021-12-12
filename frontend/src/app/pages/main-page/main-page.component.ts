import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginFailedComponent } from 'src/app/components/login-failed/login-failed.component';
>>>>>>> 2347638 (update 2)
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
<<<<<<< HEAD
  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.calcTotalAmmount();
=======
  durationInSeconds = 5;

  constructor(
    private _snackBar: MatSnackBar,
    private sharedService: SharedService
    ) {}

  ngOnInit(): void {
    this.sharedService.loginFailed.subscribe(
      failState => {
        console.log(failState);
        
        if(failState == true){
          this.openLoginFailedSnackBar()
          this.sharedService.loginFailed.next(false)
        }
      }
    )
  }

  openLoginFailedSnackBar() {
    this._snackBar.openFromComponent(LoginFailedComponent, {
      duration: this.durationInSeconds * 1000,
    });
>>>>>>> 2347638 (update 2)
  }
}
