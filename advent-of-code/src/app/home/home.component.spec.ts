import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RunnerService } from '../services/runner.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRunnerService: jasmine.SpyObj<RunnerService>;

  beforeEach(() => {
    mockRunnerService = jasmine.createSpyObj('RunnerService', ['getYears']);

    mockRunnerService.getYears.and.returnValue([2020, 2021, 2022]);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: RunnerService, useValue: mockRunnerService }],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load years on ngOnInit', () => {
      // Act
      component.ngOnInit();

      // Assert that years array is populated
      expect(component.years).toEqual([2020, 2021, 2022]);
    });

    it('should render years in the HTML', () => {
      // Act
      component.ngOnInit();
      fixture.detectChanges();

      const cardTitles = fixture.debugElement.queryAll(By.css('.card-title'));

      // Assert
      expect(cardTitles.length).toBe(3);
      expect(cardTitles[0].nativeElement.textContent).toBe('2020');
      expect(cardTitles[1].nativeElement.textContent).toBe('2021');
      expect(cardTitles[2].nativeElement.textContent).toBe('2022');
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
