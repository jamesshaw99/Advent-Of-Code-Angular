import { Component } from '@angular/core';
import { RunnerService } from './services/runner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  years: number[] = [];
  title = 'advent-of-code';

  constructor(private runnerService: RunnerService) {}

  ngOnInit(): void {
    this.years = this.runnerService.getYears();
  }
}
