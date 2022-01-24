import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashAlt, faUserEdit, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../service/data.service';
import { LoginService } from '../service/login.service';

declare function clearMarkers();
declare function clearMap();
@Component({
  selector: 'users-component',
  templateUrl: './users.component.html',
  styleUrls: ['../app.component.css'],
})
export class UsersComponent {
  usersFromDb: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  faUserEdit= faUserEdit;
  faTrashAlt= faTrashAlt;
  toggleCreateForm = false;
  toggleEditForm = false;
  firstname;
  lastname;
  location;
  usr_id;
  constructor(private dataService: DataService, private route: Router) {}
  ngOnInit() {
    this.getUsersFromApi();
    clearMarkers();
    clearMap();
  }
  getUsersFromApi() {
    this.dataService.getUsers().subscribe((response) => {
      console.log(response);
      this.usersFromDb.next(response);
    });
  }
  openCreateForm() {
    this.toggleCreateForm = true;
  }
  closeCreateForm() {
    this.toggleCreateForm = false;
    this.firstname = null;
    this.lastname = null;
    this.location = null;
  }

  createNewUser() {
    this.dataService
      .createNewUser(this.firstname, this.lastname, this.location)
      .subscribe(
        (res) => {
          console.log(res);
          this.getUsersFromApi();
          this.closeCreateForm();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  deleteUser(usr_id) {
    this.dataService.deleteUser(usr_id).subscribe(
      (res) => {
        console.log(res);
        this.getUsersFromApi();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  editUser() {
    this.dataService
      .editUser(this.usr_id, this.firstname, this.lastname, this.location)
      .subscribe(
        (res) => {
          console.log(res);
          this.getUsersFromApi();
          this.closeEditForm();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  closeEditForm() {
    this.firstname = null;
    this.lastname = null;
    this.location = null;
    this.usr_id = null;
    this.toggleEditForm = false;
  }
  openEditForm(usr_id) {
    this.toggleEditForm = true;
    this.usr_id = usr_id;
  }
  routerNavigateToMain() {
    this.route.navigate(['main']);
  }
}
