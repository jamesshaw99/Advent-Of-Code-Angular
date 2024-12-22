import { Component, OnInit } from '@angular/core';
import { RunnerService } from '../services/runner.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  years: number[] = [];
  constructor(private runnerService: RunnerService) {}

  ngOnInit(): void {
    this.years = this.runnerService.getYears();
  }
}
