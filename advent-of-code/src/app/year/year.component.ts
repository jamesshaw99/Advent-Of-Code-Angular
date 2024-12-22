import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  dailyResults: { day: number; part1: string; part2: string; title: string }[] =
    [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private runnerService: RunnerService,
    private challengeInfoService: ChallengeInfoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.year = +params['year'];
  
      this.runnerService.runAllChallenges(this.year).then((subject) => {
        this.cdr.detach();
        subject.subscribe({
          next: (data) => {
            const days = data.length;
            this.challengeInfoService
              .getChallengeTitles(this.year, days)
              .subscribe((titles) => {
                this.dailyResults = data.map((result) => {
                  const matchingTitle =
                    titles.find((title) => title.day === result.day)?.title ||
                    'Unknown Title';
  
                  return {
                    ...result,
                    title: matchingTitle,
                  };
                });
                this.cdr.detectChanges();
              });
          },
          complete: () => {
            this.cdr.reattach();
          },
        });
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
