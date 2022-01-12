import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { DataService } from './data.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['../app.component.css'],
})
export class MainComponent implements AfterViewInit {
  constructor(
    private loginService: LoginService,
    private dataService: DataService,
    calendar: NgbCalendar
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 5);
  }

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  startDate;
  endDate;

  unitId = 777777007775;
  token;
  private map;
  polyline;
  latlngs: [number, number][] = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2],
  ];

  ngAfterViewInit(): void {
    this.initMap();
  }
  ngOnInit() {
    this.getToken();
    this.loginService.checkToken();
    this.setDefault();
  }
  initMap() {
    this.map = L.map('map').setView(
      [44.785000000000004, 20.527833333333334],
      15
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }
  getPolyLine() {
    console.log(this.dataService.draw);
    if (this.polyline != null) {
      this.polyline.removeFrom(this.map);
      this.polyline.remove(this.map);
      this.map.removeLayer(this.polyline);
    }
    if (this.dataService.draw) {
      this.polyline = L.polyline(this.dataService.historyPolyLine, {
        color: '#006eff',
        smoothFactor: 0,
      }).addTo(this.map);
      this.map.fitBounds(this.polyline.getBounds());
    } 
  }

  setDefault() {
    this.startDate =
      this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    this.endDate =
      this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
  }
  getToken() {
    this.token = this.loginService.token;
  }
  get isLog(): boolean {
    return this.loginService.isLog;
  }
  submit() {
    this.dataService.submit(
      this.unitId,
      this.startDate,
      this.endDate,
      this.token
    );

    this.getPolyLine();
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.startDate = date.year + '-' + date.month + '-' + date.day;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.endDate = date.year + '-' + date.month + '-' + date.day;
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.startDate = date.year + '-' + date.month + '-' + date.day;
      this.endDate = null;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
