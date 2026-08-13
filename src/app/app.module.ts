
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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    YearComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatIconModule
  ],
  providers: [
    InputService,
    { provide: 'CHALLENGES', useValue: challengeInstances },
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
