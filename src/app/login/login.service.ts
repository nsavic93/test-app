import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService implements OnInit {
  isLog: boolean = false;
  user;
  token;

  constructor(private http: HttpClient, private route: Router) {}
  private isUserLoggedIn: boolean = false;
  ngOnInit() {
    this.checkToken();
  }

  ngOnChange() {
    this.getUserLoggedIn();
  }
  public getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
  checkToken() {
    console.log(localStorage.getItem('token'));
    
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      this.isLog = true
    } else {
      this.isLog = false
      this.route.navigate(['/login']);
    }
    console.log(this.token);
  }
  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        'https://autotrack.devellop.com:4000/login/' +
          username +
          '/' +
          password,
        {}
      )
      .pipe(map((res) => res[0]));
  }

  log(username: string, password: string) {
    this.login(username, password).subscribe((res) => {
      if (res.poruka === 'Uspesno ulogovan.') {
        console.log(res);
        this.isLog = true;
        this.token = res.token;
        localStorage.setItem('token', this.token);
        this.route.navigate(['/main']);
      } else {
        this.isLog = false;
      }
    });
  }
  logOut() {
    localStorage.clear();
    console.log(localStorage.getItem('token'));
    this.isLog = false;
    this.route.navigate(['/login']);
  }
}
