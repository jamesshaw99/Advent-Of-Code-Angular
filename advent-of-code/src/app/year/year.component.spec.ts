import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { YearComponent } from './year.component';
import { RunnerService } from '../services/runner.service';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('YearComponent', () => {
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;
  let mockRunnerService: jasmine.SpyObj<RunnerService>;
  let mockChallengeInfoService: jasmine.SpyObj<ChallengeInfoService>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock dependencies
    mockRunnerService = jasmine.createSpyObj('RunnerService', ['runAllChallenges']);
    mockChallengeInfoService = jasmine.createSpyObj('ChallengeInfoService', ['getChallengeTitles']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = { params: of({ year: 2023 }) };

    await TestBed.configureTestingModule({
      declarations: [YearComponent],
      providers: [
        { provide: RunnerService, useValue: mockRunnerService },
        { provide: ChallengeInfoService, useValue: mockChallengeInfoService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the year from route parameters', fakeAsync(() => {
      // Arrange
      const mockSubject = new Subject<any[]>();
      mockRunnerService.runAllChallenges.and.returnValue(Promise.resolve(mockSubject));
      mockChallengeInfoService.getChallengeTitles.and.returnValue(of([]));

      // Act
      component.ngOnInit();
      tick();

      // Assert
      expect(component.year).toBe(2023);
      expect(mockRunnerService.runAllChallenges).toHaveBeenCalledWith(2023);
    }));

    it('should populate dailyResults with challenge data', fakeAsync(() => {
      // Arrange
      const mockResults = [
        { day: 1, part1: 'Result 1A', part2: 'Result 1B' },
        { day: 2, part1: 'Result 2A', part2: 'Result 2B' },
      ];
      const mockTitles = [
        { day: 1, title: 'Challenge Day 1' },
        { day: 2, title: 'Challenge Day 2' },
      ];
      const mockSubject = new Subject<any[]>();

      mockRunnerService.runAllChallenges.and.returnValue(Promise.resolve(mockSubject));
      mockChallengeInfoService.getChallengeTitles.and.returnValue(of(mockTitles));

      // Act
      component.ngOnInit();
      tick();
      mockSubject.next(mockResults);
      mockSubject.complete();
      tick();

      // Assert
      expect(component.dailyResults).toEqual([
        { day: 1, part1: 'Result 1A', part2: 'Result 1B', title: 'Challenge Day 1' },
        { day: 2, part1: 'Result 2A', part2: 'Result 2B', title: 'Challenge Day 2' },
      ]);
    }));

    it('should handle missing titles gracefully', fakeAsync(() => {
      // Arrange
      const mockResults = [
        { day: 1, part1: 'Result 1A', part2: 'Result 1B' },
      ];
      const mockTitles: { day: number; title: string; }[] = [];
      const mockSubject = new Subject<any[]>();

      mockRunnerService.runAllChallenges.and.returnValue(Promise.resolve(mockSubject));
      mockChallengeInfoService.getChallengeTitles.and.returnValue(of(mockTitles));

      // Act
      component.ngOnInit();
      tick();
      mockSubject.next(mockResults);
      mockSubject.complete();
      tick();

      // Assert
      expect(component.dailyResults).toEqual([
        { day: 1, part1: 'Result 1A', part2: 'Result 1B', title: 'Unknown Title' },
      ]);
    }));
  });

  describe('goBack', () => {
    it('should navigate to the root on goBack', () => {
      // Act
      component.goBack();

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
