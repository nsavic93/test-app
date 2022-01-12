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
  historyPolyLine = [
    // [44.76046666666666, 20.42076666666667],
    // [44.760416666666664, 20.420633333333335],
    // [44.76043333333334, 20.420650000000002]
  ];
  draw: boolean = false;
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
      .get(
        'https://autotrack.devellop.com:4000/history/' +
          unitId +
          '/' +
          startDate +
          '/' +
          endDate,
        { headers: httpHeaders }
      )
      .pipe(map((res) => res));
  }

  submit(unitId, startDate, endDate, token) {
    this.getData(unitId, startDate, endDate, token).subscribe((res) => {
      // console.log(res);
      this.historyPolyLine = [];
      console.log(res.length)
      if (res.length > 0) {
        res.forEach((item) => {
          this.historyPolyLine.push(
            new L.LatLng(item.latitude, item.longitude)
          );
        });
        this.draw = true;
      } else {
        this.draw = false;
      }

      console.log(this.historyPolyLine);
    });
  }
}
