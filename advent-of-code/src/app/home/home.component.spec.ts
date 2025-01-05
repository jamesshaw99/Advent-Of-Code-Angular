import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RunnerService } from '../services/runner.service';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRunnerService: jasmine.SpyObj<RunnerService>;

  beforeEach(() => {
    mockRunnerService = jasmine.createSpyObj('RunnerService', ['getYears']);

    mockRunnerService.getYears.and.returnValue([
      { year: 2020, days: 0, stars: 0 },
      { year: 2021, days: 2, stars: 4 },
      { year: 2022, days: 5, stars: 9 },
    ]);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatIconModule],
      providers: [{ provide: RunnerService, useValue: mockRunnerService }],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load yearInfo on ngOnInit', () => {
      // Act
      component.ngOnInit();

      // Assert that yearInfo array is populated
      expect(component.yearInfo).toEqual([
        { year: 2020, days: 0, stars: 0 },
        { year: 2021, days: 2, stars: 4 },
        { year: 2022, days: 5, stars: 9 },
      ]);
    });

    it('should render years in the HTML', () => {
      // Act
      component.ngOnInit();
      fixture.detectChanges();

      const cardTitles = fixture.debugElement.queryAll(By.css('.card-title'));

      // Assert
      expect(cardTitles.length).toBe(3);
      expect(cardTitles[0].nativeElement.textContent).toBe('2020 [0star]');
      expect(cardTitles[1].nativeElement.textContent).toBe('2021 [4star]');
      expect(cardTitles[2].nativeElement.textContent).toBe('2022 [9star]');
    });
  });

  describe('html', () => {
    it('should generate correct link for each year', () => {
      // Act
      component.ngOnInit();
      fixture.detectChanges();

      const links = fixture.debugElement.queryAll(By.css('a'));

      // Assert
      expect(links.length).toBe(3);
      expect(links[0].nativeElement.getAttribute('href')).toBe('/year/2020');
      expect(links[1].nativeElement.getAttribute('href')).toBe('/year/2021');
      expect(links[2].nativeElement.getAttribute('href')).toBe('/year/2022');
    });
  });
});
