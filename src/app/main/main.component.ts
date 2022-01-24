import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { DataService } from '../service/data.service';
import { AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as L from 'leaflet';

declare function initMap();
declare function getPolyLine(historyPolyLine);
declare function clearMarkers();
declare function clearMap();
@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['../app.component.css'],
})
export class MainComponent implements AfterViewInit {
  user_id: any;
  isGpsUser: any;
  allCarsHistory: Object;
  citiesHistory: any[];
  constructor(
    private loginService: LoginService,
    private dataService: DataService,
    public datepipe: DatePipe
  ) {}
  startDate;
  endDate;
  data;
  unitId;
  token;
  arrayCities = [];
  historyPolyLine = [];

  ngAfterViewInit(): void {
    initMap();
  }
  ngOnInit() {
    this.getToken();
    this.loginService.checkToken();
    this.getAllCars();
    this.getToday();
    clearMarkers();
    clearMap();
  }
  getToday() {
    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 1);
  }

  getToken() {
    this.token = this.loginService.token;
    this.user_id = this.loginService.user_id;
    this.isGpsUser = this.loginService.isGpsUser;
  }
  get isLog(): boolean {
    return this.loginService.isLog;
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
  changeUnitId(unitId) {
    this.unitId = unitId;
    // this.submit();
  }
  // submit() {
  //   let historyPolyLine = [];
  //   if (this.startDate != null && this.endDate != null) {
  //     this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
  //     this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
  //     clearMap();
  //     this.dataService
  //       .getHistory(this.unitId, this.startDate, this.endDate)
  //       .subscribe(
  //         (res) => {
  //           console.log(res);

  //           console.log(res.length);
  //           if (res.length > 0) {
  //             this.getCity(res);
  //             res.forEach((item) => {
  //               let array = [item.latitude, item.longitude];
  //               historyPolyLine.push(array);
  //             });
  //             getPolyLine(historyPolyLine);
  //           }
  //           console.log(historyPolyLine);
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //   }
  // }

  // getCity(data) {
  //   let arrayCities = [];
  //   let finalArray = [];
  //   let add = false;
  //   for (let i = 0; i < data.length; i++) {
  //     let obj = {
  //       country: data[i].drzava,
  //       city: data[i].grad,
  //     };

  //     arrayCities.push(obj);
  //   }
  //   let obj = {
  //     country: arrayCities[0].country,
  //     city: arrayCities[0].city,
  //   };
  //   finalArray.push(obj);
    
    
  //   for (let i = 0; i < arrayCities.length; i++) {
  //     if (finalArray.length > 0) {
  //       for (let j = 0; j < finalArray.length; j++) {
  //         if (finalArray[j].city !== arrayCities[i].city) {
  //           add = true;
  //         } else {
  //           add = false;
  //           break;
  //         }
  //       }
  //     }
  //     if (add == true) {
  //       let obj = {
  //         country: arrayCities[i].country,
  //         city: arrayCities[i].city,
  //       };

  //       finalArray.push(obj);
  //       add = false;
  //     }
  //   }
  //   console.log(finalArray);
  //   this.citiesHistory = finalArray;
  // }

  logOut() {
    this.loginService.logOut();
  }
}
