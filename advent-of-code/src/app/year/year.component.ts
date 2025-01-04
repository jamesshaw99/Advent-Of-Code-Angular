import { Component, OnInit } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeInfoService } from '../services/challenge-info.service';

@Component({
  selector: 'app-year',
  standalone: false,

  templateUrl: './year.component.html',
  styleUrl: './year.component.css',
})
export class YearComponent implements OnInit {
  year = 0;
  noDays = 0;
  completionPercentage = 0;
  dailyResults: {
    day: number;
    part1: string;
    part2: string;
    timePart1: number;
    timePart2: number;
    title: string;
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private runnerService: RunnerService,
    private challengeInfoService: ChallengeInfoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.year = +params['year'];

      this.noDays = this.challengeInfoService.getNumberOfDaysForYear(this.year);

      this.runnerService.runAllChallenges(this.year).then((subject) => {
        subject.subscribe({
          next: (data) => {
            this.challengeInfoService
              .getChallengeTitle(this.year, data.day)
              .subscribe((title) => {
                const resultWithTitle = {
                  ...data,
                  title: title || 'Unknown Title',
                };
                const insertIndex = this.dailyResults.findIndex(result => result.day > data.day);
                if (insertIndex === -1) {
                  this.dailyResults.push(resultWithTitle);
                } else {
                  this.dailyResults.splice(insertIndex, 0, resultWithTitle);
                }
                this.completionPercentage = (this.dailyResults.length / this.noDays) * 100;
              });
          },
          error: (err) => {
            console.error('Subscription error:', err); // Log errors
          },
        });
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
