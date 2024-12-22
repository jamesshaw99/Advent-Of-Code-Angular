import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RunnerService } from './services/runner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  years: number[] = [];
  snowflakeArray = Array(5).fill(0);
  title = 'advent-of-code';
  @ViewChildren('snowflake', { read: ElementRef }) snowflakes!: QueryList<ElementRef>;

  constructor(private runnerService: RunnerService) {}

  ngOnInit(): void {
    this.years = this.runnerService.getYears();
  }

  ngAfterViewInit() {
    this.snowflakes.forEach((snowflake, index) => {
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
