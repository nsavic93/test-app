import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { LoginService } from '../service/login.service';
declare function getPolyLine(historyPolyLine);
declare function getCurrentLocation(currentLocation);
declare function clearMap();
declare function clearMarkers();

@Component({
  selector: 'monitoring-component',
  templateUrl: './monitoring.component.html',
  styleUrls: ['../app.component.css'],
})
export class MonitoringComponent {
  startDate: any;
  endDate: any;
  token: any;
  user_id: any;
  isGpsUser: any;

  constructor(
    private dataService: DataService,
    public datepipe: DatePipe,
    public loginService: LoginService,
    private route: Router
  ) {}
  unitId: any;
  allCarsHistory;
  ngOnInit() {
    this.getToken();
    this.loginService.checkToken();
    this.getAllCars();
    this.getToday();
    clearMap();
  }
  getToken() {
    this.token = this.loginService.token;
    this.user_id = this.loginService.user_id;
    this.isGpsUser = this.loginService.isGpsUser;
  }
  getToday() {
    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 1);
  }
  changeUnitId(unitId) {
    this.unitId = unitId;
    this.submit();
  }
  getAllCars() {
    this.dataService.getAllCars().subscribe(
      (res) => {
        this.allCarsHistory = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  submit() {
    clearMap();
    clearMarkers();
    for (let i = 0; i < this.allCarsHistory.length; i++) {
      if (this.unitId === this.allCarsHistory[i].unit_id) {
        console.log();
        let currentLocation = [
          this.allCarsHistory[i].latitude,
          this.allCarsHistory[i].longitude,
        ];
        getCurrentLocation(currentLocation);
      }
    }

    // if (this.startDate != null && this.endDate != null) {
    //   this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
    //   this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
    //   clearMap();

    //   this.dataService
    //     .getHistory(this.unitId, this.startDate, this.endDate)
    //     .subscribe(
    //       (res) => {
    //         if (res.length > 0) {
    //           let currentLocation = [
    //             res[res.length - 1].latitude,
    //             res[res.length - 1].longitude,
    //           ];
    //           clearMarkers();
    //           getCurrentLocation(currentLocation);
    //         }
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     );
    // }
  }
  routerNavigateToMain() {
    this.route.navigate(['main']);
    clearMarkers();
    
  }
}
