import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css'],
})
export class LoginComponent {
  usersFromDb;
  constructor(private loginService: LoginService) {}
  ngOnInit() {
    this.getUsersFromApi();
  }

  username;
  password;
  get isLog(): boolean {
    return this.loginService.isLog;
  }
  login() {
    this.loginService.log(this.username, this.password);
    console.log('OK');
  }
  getUsersFromApi() {
    this.loginService.getUsers().subscribe((response) => {
      console.log(response);
      this.usersFromDb = response;
    });
  }
}
