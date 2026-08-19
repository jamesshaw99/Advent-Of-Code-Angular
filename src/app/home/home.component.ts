import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { YearInfo } from '../models/YearInfo';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './home.component.css',
    imports: [MatIcon, RouterLink]
})
export class HomeComponent implements OnInit {
  private runnerService = inject(RunnerService);

  yearInfo: YearInfo[] = [];

  ngOnInit(): void {
    this.yearInfo = this.runnerService.getYears();
  }
}
