import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { DataService } from './service/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './users/users.component';
import { HistoryComponent } from './history/history.component';
import { UserUnitsComponent } from './userUnits/userunits.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { UnitsComponent } from './units/units.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UsersComponent,
    HistoryComponent,
    UserUnitsComponent,
    MonitoringComponent,
    UnitsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    LeafletModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  providers: [LoginService, DataService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
