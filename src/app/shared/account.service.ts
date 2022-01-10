import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RespModel } from '../resp';
import { UserModel } from '../user';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  tokenPayload: any;
  accessToken?: any;
  refreshToken?: any;
  expirationDateAccess: any;
  expirationDateRefresh: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  private baseURL = 'http://127.0.0.1:5000/';
  private usersURL = 'http://127.0.0.1:5000/users/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.accessToken,
    }),
  };

  canActivate(): boolean {
    if (this.isExpired(localStorage.getItem('refresh') || '')) {
      this.router.navigate(['/']);
      this.sharedService.loginFailed.next(true)
      return false;
    }
    return true;
  }

  getAccessTokenPayload() {
    return JSON.stringify(this.jwtHelper.decodeToken(this.accessToken));
  }

  getTokenExpirationDate(token: string) {
    var expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    return expirationDate;
  }

  isExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    this.logout()
    return this.http
      .post<UserModel>(this.baseURL + 'api/token/', { username, password })
      .pipe(
        tap((res) => {
            this.getUserByUsername(username).subscribe(
              (res) => {
                console.log(res)
                localStorage.setItem('username', res[0].username)
                localStorage.setItem('email', res[0].email)
                localStorage.setItem('profile_pic', res[0].profile_picture)
                localStorage.setItem('id', String(res[0].id))
                
              },
              (err) => {
                console.log(err);
                this.sharedService.loginFailed.next(true)
              }
            )
          this.saveTokens(res, false);
          console.log(res);
        })
      );
  }

  refreshLogin() {
    console.log(this.refreshToken);
    return this.http
      .post<RespModel>(
        this.baseURL + 'api/token/refresh/',
        { refresh: localStorage.getItem('refresh') },
        this.httpOptions
      )
      .pipe(
        tap((res) => console.log(`got refreshed tokens ${res['access']} ${this.isExpired(res['refresh'])} ${res}`)),
        tap((res) => this.saveTokens(res, true))
      );
  }

  saveTokens(res: any, refresh: boolean) {
    var accessToken: string = res['access'];
    var refreshToken: string = res['refresh'];

    //if access token is refreshed there is no new refresh token.
    //This is implemented not to overwrite refresh-token to undefined.
    if (refresh) {
      this.accessToken = accessToken;
      localStorage.setItem('access', accessToken);
    } else {
      this.accessToken = accessToken;
      localStorage.setItem('access', accessToken);
      this.refreshToken = refreshToken;
      localStorage.setItem('refresh', refreshToken);
    }
  }

  logout() {
    this.sharedService.loginFailed.next(false)
    this.router.navigateByUrl('/product-list')
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('profile_pic')
    localStorage.removeItem('id')
  }

  getAllUseres(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.usersURL}`);
  }

  getUserById(id: number): Observable<UserModel> {
    const url = this.usersURL + id;
    return this.http.get<UserModel>(url);
  }

  getUserByUsername(term: string): Observable<UserModel[]>{
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<UserModel[]>(`${this.usersURL}?search=${term}`);
  }

  getEmail(email: string) {
    if(!email.trim()){return of([]);}
    return this.http.get(`${this.baseURL}?search=${email}`, this.httpOptions);
  }

  registerNewUser(uploadData: FormData){
    return this.http.post<UserModel>(this.baseURL + 'register-new-user/', uploadData)// 'profile_picture': profile_picture})
  }
}
