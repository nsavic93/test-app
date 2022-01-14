import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { DataService } from '../service/data.service';
import { AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as L from 'leaflet';

declare function getCity(res);
declare function initMap();
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
  private map;
  polyline;
  arrayCities = [];
  historyPolyLine = [];
  draw = false;

  ngAfterViewInit(): void {
    this.map = initMap();
  }
  ngOnInit() {
    this.getToken();
    this.loginService.checkToken();
    this.setDefault();
    this.getAllCars();
    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 1);
  }

  getPolyLine() {
    this.polyline = L.polyline(this.historyPolyLine, {
      color: '#006eff',
      smoothFactor: 0,
    }).addTo(this.map);
    this.map.fitBounds(this.polyline.getBounds());
  }

  setDefault() {}
  getToken() {
    this.token = this.loginService.token;
    this.user_id = this.loginService.user_id;
    this.isGpsUser = this.loginService.isGpsUser;
  }
  get isLog(): boolean {
    return this.loginService.isLog;
  }
  getAllCars() {
    this.dataService.getAllCars().subscribe((res) => {
      this.allCarsHistory = res;
      console.log(res);
    });
  }
  changeUnitId(unitId) {
    this.unitId = unitId;
    this.submit();
  }
  submit() {
    if (this.startDate != null && this.endDate != null) {
      this.startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
      this.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');
      if (this.polyline != null) {
        this.map.removeLayer(this.polyline);
      }
      this.dataService
        .getData(this.unitId, this.startDate, this.endDate, this.token)
        .subscribe((res) => {
          console.log(res);
          this.historyPolyLine = [];
          console.log(res.length);
          if (res.length > 0) {
            this.getCity(res);
          }

          // this.unitHistory
          if (res.length > 0) {
            res.forEach((item) => {
              let array = [item.latitude, item.longitude];
              this.historyPolyLine.push(
                // new L.LatLng(item.latitude, item.longitude)
                array
              );
            });
            this.getPolyLine();
          } else {
            this.draw = false;
          }

          console.log(this.historyPolyLine);
        });
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
}
