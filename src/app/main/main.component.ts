import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { DataService } from './data.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['../app.component.css'],
})
export class MainComponent {
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
  ngOnInit() {
    this.getToken();
    this.loginService.checkToken();
    this.setDefault();

  }
  setDefault(){
    this.startDate = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    this.endDate = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
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
      this.endDate= null;
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
