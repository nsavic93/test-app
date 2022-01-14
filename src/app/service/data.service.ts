import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService implements OnInit {
  isLog: boolean = false;
  user;
  token;
  historyPolyLine = [];
  draw: boolean = false;
  nodeApiUrl = 'https://autotrack.devellop.com:4000';
  constructor(private http: HttpClient, private route: Router) {}
  private isUserLoggedIn: boolean = false;
  ngOnInit() {}
  ngOnChange() {
    this.getUserLoggedIn();
  }
  public getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
  getData(unitId, startDate, endDate, token): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'auth-token': token,
    });

    return this.http
      .get(`${this.nodeApiUrl}/history/${unitId}/${startDate}/${endDate}`, {
        headers: httpHeaders,
      })
      .pipe(map((res) => res));
  }

  // submit(unitId, startDate, endDate, token) {
  //   this.getData(unitId, startDate, endDate, token).subscribe((res) => {
  //     console.log(res);
  //     this.historyPolyLine = [];

  //     console.log(res.length);
  //     if (res.length > 0) {
  //       res.forEach((item) => {
  //         let array = [item.latitude, item.longitude];
  //         this.historyPolyLine.push(array);
  //       });
  //       this.draw = true;
  //     } else {
  //       this.draw = false;
  //     }
  //     console.log(this.historyPolyLine);
  //   });
  // }

  getAllCars() {
    const httpHeaders = new HttpHeaders({
      'auth-token': localStorage.getItem('token'),
    });
    console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem('user_id'))
    console.log(localStorage.getItem('isGpsUser'))
    return this.http
      .get(`${this.nodeApiUrl}/unit/allDetails/${localStorage.getItem('user_id')}/${localStorage.getItem('isGpsUser')}`, {
        headers: httpHeaders,
      })
      .pipe(map((res) => res));
  }
}
