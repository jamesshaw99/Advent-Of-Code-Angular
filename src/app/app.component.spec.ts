import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RunnerService } from './services/runner.service';

class MockRunnerService {
  getYears() {
    return [{year: 2023, days: 5, stars: 10}, {year: 2024, days: 10, stars: 20}];
  }
}

function mockMatchMedia(prefersDark: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: prefersDark,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    localStorage.clear();
    mockMatchMedia(false);

    await TestBed.configureTestingModule({
    imports: [RouterModule.forRoot([]), AppComponent],
    providers: [
        provideRouter([]),
        { provide: RunnerService, useClass: MockRunnerService },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'advent-of-code'`, () => {
    expect(component.title).toEqual('advent-of-code');
  });

  describe('html', () => {
    it('should render the navbar with correct brand title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navbarBrand = compiled.querySelector('.navbar-brand');
      expect(navbarBrand?.textContent).toContain('Advent of Code');
    });

    it('should dynamically generate navigation links based on years', () => {
      const links = fixture.debugElement.queryAll(By.css('.nav-link'));
      expect(links.length).toBe(2);

      const linkTexts = links.map((link) =>
        link.nativeElement.textContent.replace(/\s+/g, ' ').trim()
      );
      expect(linkTexts[0]).toContain('2023');
      expect(linkTexts[0]).toContain('10');
      expect(linkTexts[1]).toContain('2024');
      expect(linkTexts[1]).toContain('20');

      const linkHrefs = links.map((link) =>
        link.nativeElement.getAttribute('href')
      );
      expect(linkHrefs).toEqual(['/year/2023', '/year/2024']);
    });
  });

  describe('toggleNav', () => {
    it('should flip isNavOpen each time it is called', () => {
      expect(component.isNavOpen).toBe(false);

      component.toggleNav();
      expect(component.isNavOpen).toBe(true);

      component.toggleNav();
      expect(component.isNavOpen).toBe(false);
    });

    it('should apply the "show" class to the nav-collapse element when the toggler is clicked', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toggler = compiled.querySelector('.navbar-toggler') as HTMLButtonElement;
      const collapse = () => compiled.querySelector('.navbar-collapse');

      expect(collapse()?.classList.contains('show')).toBe(false);

      toggler.click();
      fixture.detectChanges();

      expect(collapse()?.classList.contains('show')).toBe(true);
    });
  });

  describe('theme', () => {
    it('should default to light when the OS has no dark preference and nothing is stored', () => {
      expect(component.isDarkMode).toBe(false);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should default to dark when the OS prefers dark and nothing is stored', () => {
      mockMatchMedia(true);

      const freshFixture = TestBed.createComponent(AppComponent);
      freshFixture.detectChanges();

      expect(freshFixture.componentInstance.isDarkMode).toBe(true);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should prefer a stored theme over the OS preference', () => {
      localStorage.setItem('aoc-theme', 'light');
      mockMatchMedia(true);

      const freshFixture = TestBed.createComponent(AppComponent);
      freshFixture.detectChanges();

      expect(freshFixture.componentInstance.isDarkMode).toBe(false);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should flip isDarkMode, update the DOM attribute, and persist the choice when toggled', () => {
      component.toggleTheme();

      expect(component.isDarkMode).toBe(true);
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(localStorage.getItem('aoc-theme')).toBe('dark');

      component.toggleTheme();

      expect(component.isDarkMode).toBe(false);
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(localStorage.getItem('aoc-theme')).toBe('light');
    });

    it('should update the toggle button icon when clicked', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleButton = compiled.querySelector('.theme-toggle') as HTMLButtonElement;

      expect(toggleButton.textContent?.trim()).toBe('☀');

      toggleButton.click();
      fixture.detectChanges();

      expect(toggleButton.textContent?.trim()).toBe('☾');
    });
  });
});
