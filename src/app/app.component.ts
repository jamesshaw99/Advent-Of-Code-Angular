import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RunnerService } from './services/runner.service';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

const THEME_STORAGE_KEY = 'aoc-theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './app.component.css',
    imports: [MatIcon, RouterOutlet],
})
export class AppComponent implements OnInit {
  private runnerService = inject(RunnerService);

  yearInfo: {year: number, days: number, stars: number}[] = [];
  title = 'advent-of-code';
  isNavOpen = false;
  isDarkMode = false;

  ngOnInit(): void {
    this.yearInfo = this.runnerService.getYears();
    this.isDarkMode = this.resolveInitialTheme();
    this.applyTheme();
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(THEME_STORAGE_KEY, this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private resolveInitialTheme(): boolean {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
