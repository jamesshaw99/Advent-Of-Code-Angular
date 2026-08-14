import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, inject, ChangeDetectionStrategy } from '@angular/core';
import { RunnerService } from './services/runner.service';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './app.component.css',
    imports: [MatIcon, RouterOutlet],
})
export class AppComponent implements OnInit, AfterViewInit {
  private runnerService = inject(RunnerService);

  yearInfo: {year: number, days: number, stars: number}[] = [];
  snowflakeArray = Array(5).fill(0);
  title = 'advent-of-code';
  @ViewChildren('snowflake', { read: ElementRef }) snowflakes!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.yearInfo = this.runnerService.getYears();
  }

  ngAfterViewInit() {
    this.snowflakes.forEach((snowflake) => {
      const element = snowflake.nativeElement;

      const randomDelay = Math.random() * 5;
      const randomXPosition = Math.random() * 100;
      const randomDuration = 3 + Math.random() * 5;
      const randomFontSize = 1 + Math.random() * 2;

      element.style.animationDelay = `${randomDelay}s`;
      element.style.animationDuration = `${randomDuration}s`;
      element.style.fontSize = `${randomFontSize}rem`;

      element.style.left = `${randomXPosition}%`;
    });
  }
}
