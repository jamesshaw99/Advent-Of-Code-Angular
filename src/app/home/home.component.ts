import { Component, OnInit, inject } from '@angular/core';
import { RunnerService } from '../services/runner.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private runnerService = inject(RunnerService);

  yearInfo: {year: number, days: number, stars: number}[] = [];

  ngOnInit(): void {
    this.yearInfo = this.runnerService.getYears();
  }
}
