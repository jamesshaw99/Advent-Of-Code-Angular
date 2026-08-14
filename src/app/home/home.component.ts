import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './home.component.css',
    imports: [MatIcon]
})
export class HomeComponent implements OnInit {
  private runnerService = inject(RunnerService);

  yearInfo: {year: number, days: number, stars: number}[] = [];

  ngOnInit(): void {
    this.yearInfo = this.runnerService.getYears();
  }
}
