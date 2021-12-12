import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SensorModel } from '../sensor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {}

  private senorsURL = 'http://127.0.0.1:5000/sensors-old/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access'),
    }),
  };

  getSensors(): Observable<any[]> {
    return this.http.get<SensorModel[]>(this.senorsURL);
  }
}
