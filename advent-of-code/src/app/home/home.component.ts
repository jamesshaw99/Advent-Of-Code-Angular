import { Component, OnInit } from '@angular/core';
import { RunnerService } from '../services/runner.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  yearInfo: {year: number, days: number, stars: number}[] = [];
  constructor(private runnerService: RunnerService) {}

  ngOnInit(): void {
    this.yearInfo = this.runnerService.getYears();
  }
}
