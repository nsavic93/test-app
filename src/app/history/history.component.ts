import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { DatePipe } from '@angular/common';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

declare function initMap();
declare function clearMarkers();
declare function getPolyLine(historyPolyLine);
declare function clearMap();
@Component({
  selector: 'history-component',
  templateUrl: './history.component.html',
  styleUrls: ['../app.component.css'],
})
export class HistoryComponent {
  citiesHistory: any[];
  allCarsHistory;
  token: any;
  user_id: any;
  isGpsUser: any;

  constructor(
    private dataService: DataService,
    public datepipe: DatePipe,
    public loginService: LoginService,
    private route: Router
  ) {}
  startDate;
  endDate;
  unitId: any;
  ngOnInit() {
    // clearMap();
    this.getToken();
    this.loginService.checkToken();
    this.getAllCars();
    this.getToday();
    clearMarkers();
  }
  getToken() {
    this.token = this.loginService.token;
    this.user_id = this.loginService.user_id;
    this.isGpsUser = this.loginService.isGpsUser;
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
  getToday() {
    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 1);
  }
  submit() {
    let historyPolyLine = [];
    if (this.startDate != null && this.endDate != null) {
      this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
      this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
      clearMap();
      this.dataService
        .getHistory(this.unitId, this.startDate, this.endDate)
        .subscribe(
          (res) => {
            console.log(res);

            console.log(res.length);
            if (res.length > 0) {
              this.getCity(res);
              res.forEach((item) => {
                let array = [item.latitude, item.longitude];
                historyPolyLine.push(array);
              });
              getPolyLine(historyPolyLine);
            }
            console.log(historyPolyLine);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  getCity(data) {
    let arrayCities = [];
    let finalArray = [];
    let add = false;
    for (let i = 0; i < data.length; i++) {
      let obj = {
        country: data[i].drzava,
        city: data[i].grad,
      };

      arrayCities.push(obj);
    }
    let obj = {
      country: arrayCities[0].country,
      city: arrayCities[0].city,
    };
    finalArray.push(obj);

    for (let i = 0; i < arrayCities.length; i++) {
      if (finalArray.length > 0) {
        for (let j = 0; j < finalArray.length; j++) {
          if (finalArray[j].city !== arrayCities[i].city) {
            add = true;
          } else {
            add = false;
            break;
          }
        }
      }
      if (add == true) {
        let obj = {
          country: arrayCities[i].country,
          city: arrayCities[i].city,
        };

        finalArray.push(obj);
        add = false;
      }
    }
    console.log(finalArray);
    this.citiesHistory = finalArray;
  }
  routerNavigateToMain() {
    clearMap();
    this.route.navigate(['main']);
 
  
  }
}
