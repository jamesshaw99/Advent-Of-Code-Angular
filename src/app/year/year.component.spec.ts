import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { YearComponent } from './year.component';
import { RunnerService } from '../services/runner.service';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { RunnerResults } from '../models/RunnerResults';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('YearComponent', () => {
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;
  let mockRunnerService: jasmine.SpyObj<RunnerService>;
  let mockChallengeInfoService: jasmine.SpyObj<ChallengeInfoService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock dependencies
    mockRunnerService = jasmine.createSpyObj('RunnerService', ['runAllChallenges']);
    mockChallengeInfoService = jasmine.createSpyObj('ChallengeInfoService', ['getChallengeTitle', 'getNumberOfDaysForYear']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = { params: of({ year: 2023 }) };

    await TestBed.configureTestingModule({
      declarations: [YearComponent],
      imports: [MatProgressBarModule],
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
      const mockSubject = new Subject<RunnerResults>();
      mockRunnerService.runAllChallenges.and.returnValue(Promise.resolve(mockSubject));
      mockChallengeInfoService.getChallengeTitle.and.returnValue(of(''));
      mockChallengeInfoService.getNumberOfDaysForYear.and.returnValue(25);

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
        { day: 1, part1: 'Result 1A', part2: 'Result 1B', timePart1: 0, timePart2: 0 },
        { day: 2, part1: 'Result 2A', part2: 'Result 2B', timePart1: 0, timePart2: 0 },
      ];
      const mockSubject = new Subject<RunnerResults>();

      mockRunnerService.runAllChallenges.and.returnValue(Promise.resolve(mockSubject));
      mockChallengeInfoService.getChallengeTitle.withArgs(2023, 1).and.returnValue(of('Challenge Day 1')).withArgs(2023, 2).and.returnValue(of('Challenge Day 2'));
      mockChallengeInfoService.getNumberOfDaysForYear.and.returnValue(25);

      // Act
      component.ngOnInit();
      tick();
      mockSubject.next(mockResults[0]);
      mockSubject.next(mockResults[1]);
      mockSubject.complete();
      tick();

      // Assert
      expect(component.dailyResults).toEqual([
        { day: 1, part1: 'Result 1A', part2: 'Result 1B', timePart1: 0, timePart2: 0, title: 'Challenge Day 1' },
        { day: 2, part1: 'Result 2A', part2: 'Result 2B', timePart1: 0, timePart2: 0, title: 'Challenge Day 2' },
      ]);
    }));

    it('should insert results in order of day', fakeAsync(() => {
      //Arrange
      component.dailyResults = [
        { day: 1, part1: 'Result 1A', part2: 'Result 1B', timePart1: 0, timePart2: 0, title: 'Challenge Day 1' },
        { day: 3, part1: 'Result 3A', part2: 'Result 3B', timePart1: 0, timePart2: 0, title: 'Challenge Day 3' },
      ]

      const newResult = { day: 2, part1: 'Result 2A', part2: 'Result 2B', timePart1: 0, timePart2: 0 };
      const mockSubject = new Subject<RunnerResults>();

      mockRunnerService.runAllChallenges.and.returnValue(Promise.resolve(mockSubject));
      mockChallengeInfoService.getChallengeTitle.and.returnValue(of('Challenge Day 2'));
      mockChallengeInfoService.getNumberOfDaysForYear.and.returnValue(25);

      //Act
      component.ngOnInit();
      tick();
      mockSubject.next(newResult);
      tick();

      // Assert
      expect(component.dailyResults).toEqual([
        { day: 1, part1: 'Result 1A', part2: 'Result 1B', timePart1: 0, timePart2: 0, title: 'Challenge Day 1' },
        { day: 2, part1: 'Result 2A', part2: 'Result 2B', timePart1: 0, timePart2: 0, title: 'Challenge Day 2' },
        { day: 3, part1: 'Result 3A', part2: 'Result 3B', timePart1: 0, timePart2: 0, title: 'Challenge Day 3' }
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
