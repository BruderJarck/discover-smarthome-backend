import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/shared/account.service';
import { Router } from '@angular/router';

export interface Chip {
  name: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(Login);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
export class Login {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  
  hide = true;
  constructor(public accountService: AccountService,
              private router: Router,
    ){}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.accountService.getTokensFromBackend(this.email.value, this.password.value).subscribe(
      () => this.router.navigateByUrl('/user'), 
      err => {
        console.log(err);
        
      })
    console.log(this.email.value);
    console.log(this.password.value);
  }
}
