import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { UnitsComponent } from './units/units.component';
import { UsersComponent } from './users/users.component';
import { UserUnitsComponent } from './userUnits/userunits.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'units',
        component: UnitsComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'monitoring',
        component: MonitoringComponent,
      },
      {
        path: 'userunits',
        component: UserUnitsComponent,
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
