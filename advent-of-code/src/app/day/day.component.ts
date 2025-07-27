import { Component, OnInit } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeInfoService } from '../services/challenge-info.service';

@Component({
  selector: 'app-day',
  standalone: false,

  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
})
export class DayComponent implements OnInit{
  year!: number;
  day!: number;
  result: { part1: string; part2: string } | null = null;
  challengeInfo: {
    title: string;
    part1Description: string[];
    part2Description: string[];
  } | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private runnerService: RunnerService,
    private challengeInfoService: ChallengeInfoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.year = +params['year'];
      this.day = +params['day'];
      
      this.challengeInfoService
        .getChallengeInfo(this.year, this.day)
        .subscribe((data) => {
          this.challengeInfo = data;
        });

      this.runnerService
        .runChallenge(this.year, this.day)
        .then((data) => {
          this.result = data;
        });
    });
  }

  goBack(): void {
    this.router.navigate(['/year/' + this.year]);
  }
}
