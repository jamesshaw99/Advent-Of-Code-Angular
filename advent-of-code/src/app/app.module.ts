
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { YearComponent } from './year/year.component';
import { provideHttpClient } from '@angular/common/http';
import { InputService } from './services/input.service';
import { DayComponent } from './day/day.component';
import { challengeInstances } from './helpers/challenge-definitions';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    YearComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    InputService,
    { provide: 'CHALLENGES', useValue: challengeInstances },
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
