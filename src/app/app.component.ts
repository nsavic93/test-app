import { Component } from '@angular/core';

import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  title = 'test-app';

  constructor(private loginService: LoginService) {}
  ngOnInit() {
    this.isLoggedIn();
  }
  ngAfterViewInit(): void {
 
  }
  isLoggedIn() {
    this.loginService.checkToken();
  }
  get isLog(): boolean {
    return this.loginService.isLog;
  }
  logOut() {
    this.loginService.logOut();
  }
}
