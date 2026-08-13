import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { DayComponent } from './day.component';
import { RunnerService } from '../services/runner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { of } from 'rxjs';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;
  let mockRunnerService: jasmine.SpyObj<RunnerService>;
  let mockChallengeInfoService: jasmine.SpyObj<ChallengeInfoService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRunnerService = jasmine.createSpyObj('RunnerService', ['runChallenge']);
    mockChallengeInfoService = jasmine.createSpyObj('ChallengeInfoService', [
      'getChallengeInfo',
    ]);
    mockActivatedRoute = { params: of({ year: 2023, day: 5 }) };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DayComponent],
      providers: [
        { provide: RunnerService, useValue: mockRunnerService },
        { provide: ChallengeInfoService, useValue: mockChallengeInfoService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch challenge info and run challenge on init', async () => {
      // Arrange
      const challengeInfo = {
        title: 'Test Challenge',
        part1Description: ['Part 1 Description'],
        part2Description: ['Part 2 Description'],
      };
      mockChallengeInfoService.getChallengeInfo.and.returnValue(of(challengeInfo));
    
      const result = { part1: 'Part 1 Result', part2: 'Part 2 Result', timePart1: 0, timePart2: 0 };
      mockRunnerService.runChallenge.and.returnValue(Promise.resolve(result));
    
      // Act
      await component.ngOnInit();
    
      // Assert
      expect(component.challengeInfo).toEqual(challengeInfo);
      expect(mockChallengeInfoService.getChallengeInfo).toHaveBeenCalledWith(2023, 5);
      expect(component.result).toEqual(result);
      expect(mockRunnerService.runChallenge).toHaveBeenCalledWith(2023, 5);
    });
  });

  describe('goBack', () => {
    it('should navigate back to year view on goBack', () => {
      // Arrange
      component.year = 2023;

      // Act
      component.goBack();

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/year/2023']);
    });
  });
});
