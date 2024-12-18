import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DayComponent } from './day/day.component';
import { YearComponent } from './year/year.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'year/:year', component: YearComponent },
  { path: ':year/day/:day', component: DayComponent },
  // Catch-all route
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
