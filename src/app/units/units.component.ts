import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../service/data.service';
declare function clearMarkers();
declare function clearMap();
@Component({
  selector: 'units-component',
  templateUrl: './units.component.html',
  styleUrls: ['../app.component.css'],
})
export class UnitsComponent {
  constructor(private dataService: DataService , private route: Router) {}
  unitsFromDb: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  faUserEdit= faUserEdit;
  faTrashAlt= faTrashAlt;
  unt_id: any;
  marka: any;
  model: any;
  toggleCreateForm = false;
  toggleEditForm = false;
  ngOnInit() {
    this.getUnitsFromDb();
    clearMarkers();
    clearMap();
  }

  getUnitsFromDb() {
    this.dataService.getUnits().subscribe((response) => {
      console.log(response);
      this.unitsFromDb.next(response);
    });
  }
  deleteModel(unt_id) {
    this.dataService.deleteUnit(unt_id).subscribe(
      (res) => {
        console.log(res);
        this.getUnitsFromDb();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editUnit() {
    this.dataService.editUnit(this.unt_id, this.marka, this.model).subscribe(
      (res) => {
        console.log(res);
        this.getUnitsFromDb();
        this.closeEditForm();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  createNewUnit() {
    this.dataService.createNewUnit(this.marka, this.model).subscribe(
      (res) => {
        console.log(res);
        this.getUnitsFromDb();
        this.closeCreateForm();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openCreateForm() {
    this.toggleCreateForm = true;
  }
  closeCreateForm() {
    this.toggleCreateForm = false;
    this.marka = null;
    this.model = null;
  }
  closeEditForm() {
    this.toggleEditForm = false;
    this.unt_id = null;
    this.marka = null;
    this.model = null;
  }
  openEditForm(unt_id) {
    this.toggleEditForm = true;
    this.unt_id = unt_id;
  }
  routerNavigateToMain() {
    this.route.navigate(['main']);
  }
}
