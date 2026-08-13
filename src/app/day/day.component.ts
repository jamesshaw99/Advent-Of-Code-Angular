import { Component, OnInit, inject } from '@angular/core';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private runnerService = inject(RunnerService);
  private challengeInfoService = inject(ChallengeInfoService);

  year!: number;
  day!: number;
  result: { part1: string; part2: string } | null = null;
  challengeInfo: {
    title: string;
    part1Description: string[];
    part2Description: string[];
  } | null = null;

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
