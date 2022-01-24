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
  getHistory(unitId, startDate, endDate): Observable<UnitHistory[]> {
    const httpHeaders = new HttpHeaders({
      'auth-token': localStorage.getItem('token'),
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
  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }
  createNewUser(firstname, lastname, location) {
    return this.http.post(
      'http://localhost:3000/users',
      {
        usr_firstname: firstname,
        usr_lastname: lastname,
        usr_location: location,
      },
      { responseType: 'text' }
    );
  }
  deleteUser(usr_id) {
    return this.http.delete(`http://localhost:3000/users/${usr_id}`, {
      responseType: 'text',
    });
  }
  editUser(usr_id, firstname, lastname, location) {
    return this.http.put(
      `http://localhost:3000/users/${usr_id}`,
      {
        usr_firstname: firstname,
        usr_lastname: lastname,
        usr_location: location,
      },
      { responseType: 'text' }
    );
  }
  getUnits() {
    return this.http.get('http://localhost:3000/units');
  }
  createNewUnit(marka, model) {
    return this.http.post(
      'http://localhost:3000/units',
      {
        unt_marka: marka,
        unt_model: model,
      },
      { responseType: 'text' }
    );
  }
  deleteUnit(unt_id) {
    return this.http.delete(`http://localhost:3000/units/${unt_id}`, {
      responseType: 'text',
    });
  }
  editUnit(unt_id, marka, model) {
    return this.http.put(
      `http://localhost:3000/units/${unt_id}`,
      {
        unt_marka: marka,
        unt_model: model,
      },
      { responseType: 'text' }
    );
  }

  getUnitsByUserId(usr_id) {
    return this.http.get(`http://localhost:3000/users_units/usr_id`, {
      params: {
        usr_id: usr_id,
      },
    });
  }
  deleteUserUnitsByid(usr_unt_id) {
    console.log("AAAA " +usr_unt_id);
    
    return this.http.delete(
      `http://localhost:3000/users_units/${usr_unt_id}`,
      {
        responseType: 'text',
      }
    );
  }
  addNewUserUnits(unt_id, usr_id) {
    return this.http.post(
      'http://localhost:3000/users_units',
      {
        usr_id: usr_id,
        unt_id: unt_id,
      },
      { responseType: 'text' }
    );
  }
  changeUnitDostupan(unt_id, unt_dostupan) {
    return this.http.put(
      `http://localhost:3000/units/dostupan/${unt_id}`,
      {
        unt_dostupan: !unt_dostupan,
      },
      { responseType: 'text' }
    );
  }
}
