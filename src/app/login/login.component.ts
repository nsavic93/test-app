import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css'],
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    
  ) {}
  
  username;
  password;
  get isLog():boolean {
    return this.loginService.isLog;
  }
  login() { 
    this.loginService.log(this.username,this.password)
    console.log("OK");
  }
}
