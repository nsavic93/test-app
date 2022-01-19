import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UnitHistory } from '../interface/unit-history';
import { Unit } from '../interface/unit';
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
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    }
    if (errorResponse.status == 403) {
      return throwError('403');
    }
    if (errorResponse.status == 404) {
      return throwError('404');
    }
    if (errorResponse.status == 500) {
      return throwError('500');
    }
    return throwError(errorResponse);
  }
  getHistory(unitId, startDate, endDate, token): Observable<UnitHistory[]> {
    const httpHeaders = new HttpHeaders({
      'auth-token': token,
    });

    return this.http
      .get<UnitHistory[]>(
        `${this.nodeApiUrl}/history/${unitId}/${startDate}/${endDate}`,
        {
          headers: httpHeaders,
        }
      )
      .pipe(catchError(this.handleError));
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

  getAllCars(): Observable<Unit[]> {
    const httpHeaders = new HttpHeaders({
      'auth-token': localStorage.getItem('token'),
    });
    return this.http
      .get<Unit[]>(
        `${this.nodeApiUrl}/unit/allDetails/${localStorage.getItem(
          'user_id'
        )}/${localStorage.getItem('isGpsUser')}`,
        {
          headers: httpHeaders,
        }
      )
      .pipe(catchError(this.handleError));
    // .pipe(map((res) => res));
  }
}
