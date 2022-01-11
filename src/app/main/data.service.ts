import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService implements OnInit {
  isLog: boolean = false;
  user;
  token;

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
      'auth-token': token
    });

    return this.http
      .get(
        'https://autotrack.devellop.com:4000/history/' +
          unitId +
          '/' +
          startDate +
          '/' +
          endDate , {headers:httpHeaders}
      )
      .pipe(map((res) => res));
  }

  submit(unitId, startDate, endDate, token) {
    this.getData(unitId, startDate, endDate, token).subscribe((res) => {
      console.log(res);
    });
  }
}
