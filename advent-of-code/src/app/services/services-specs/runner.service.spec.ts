import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RunnerService } from '../runner.service';
import { InputService } from '../input.service';
import { challengeInstances } from '../../helpers/challenge-definitions';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RunnerResults } from '../../models/RunnerResults';
import { day } from '../../helpers/day';

describe('RunnerService', () => {
  let service: RunnerService;
  let inputService: jasmine.SpyObj<InputService>;
  let httpMock: HttpTestingController;

  const mockChallengeInstances = [
    {
      year: 2023,
      day: 1,
      instance: new day(
        jasmine
          .createSpy('run')
          .and.returnValue({ part1: 'result1', part2: 'result1' })
      ),
    },
    {
      year: 2023,
      day: 2,
      instance: new day(
        jasmine
          .createSpy('run')
          .and.returnValue({ part1: 'result2', part2: 'result2' })
      ),
    },
    {
      year: 2023,
      day: 3,
      instance: new day(
        jasmine
          .createSpy('run')
          .and.returnValue({ part1: 'result3', part2: 'result3' })
      ),
    },
  ];

  beforeEach(() => {
    inputService = jasmine.createSpyObj('InputService', ['loadInput']);

    TestBed.configureTestingModule({
      providers: [
        RunnerService,
        { provide: InputService, useValue: inputService },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(RunnerService);
    httpMock = TestBed.inject(HttpTestingController);

    service.challenges = [];
    service.initializeChallenges(mockChallengeInstances);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('initializeChallenges', () => {
    it('should initialize challenges from challengeInstances', () => {
      // Act
      service.initializeChallenges(mockChallengeInstances);

      // Assert
      expect(service['challenges'][2023][1]).toBeDefined();
      expect(service['challenges'][2023][2]).toBeDefined();
    });
  });

  describe('getYears', () => {
    it('should return years with challenges', () => {
      // Arrange
      service.initializeChallenges(challengeInstances);

      // Act
      const years = service.getYears();

      // Assert
      expect(years.length).toBeGreaterThan(0);
    });
  });

  describe('runAllChallenges', () => {
    it('should run all challenges for a given year', fakeAsync(() => {
      // Arrange
      const year = 2023;
      const mockResults = [
        { day: 1, part1: 'result1', part2: 'result2' },
        { day: 2, part1: 'result1', part2: 'result2' },
        { day: 3, part1: 'result1', part2: 'result2' },
      ];

      spyOn(service, 'runChallenge').and.callFake(
        (year: number, day: number) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(mockResults.find((result) => result.day === day)!);
            }, 100);
          });
        }
      );

      // Act
      const emittedResults: RunnerResults[][] = [];
      const subjectPromise = service.runAllChallenges(year);

      subjectPromise.then((subject) => {
        subject.subscribe((result) => {
          emittedResults.push(result);
        });
      });

      tick(300);

      // Assert
      expect(emittedResults.length).toBe(3);
      expect(emittedResults[0]).toEqual([
        { day: 1, part1: 'result1', part2: 'result2' },
      ]);
      expect(emittedResults[1]).toEqual([
        { day: 1, part1: 'result1', part2: 'result2' },
        { day: 2, part1: 'result1', part2: 'result2' },
      ]);
      expect(emittedResults[2]).toEqual(mockResults);
    }));
  });

  describe('runChallenge', () => {
    it('should return challenge result for a specific day and year', async () => {
      // Arrange
      const year = 2023;
      const day = 1;
      const mockResult = { part1: 'result1', part2: 'result2', input: [] };

      service.challenges = {
        2023: {
          1: {
            run: () => mockResult,
          }
        }
      };

      spyOn(service, 'runChallengeWithWorker').and.returnValue(
        Promise.resolve(mockResult)
      );

      // Act
      const result = await service.runChallenge(year, day);

      // Assert
      expect(result).toEqual(mockResult);
    });

    it('should return a default message if no challenge is implemented', async () => {
      // Arrange
      const year = 2023;
      const day = 99;

      // Act
      const result = await service.runChallenge(year, day);

      // Assert
      expect(result).toEqual({
        part1: `No challenge implemented for Day ${day} of ${year}`,
        part2: `No challenge implemented for Day ${day} of ${year}`,
      });
    });
  });

  describe('runChallengeWithWorker', () => {
    it('should resolve challenge data when worker posts message', (done) => {
      const mockInput = ['mock input data']; // Your mock input data
      const mockWorkerResponse = { part1: 'Result 1', part2: 'Result 2' }; // Worker response

      // Mock the observable from the input service
      inputService.loadInput.and.returnValue(of(mockInput));

      // Create a spy for the Web Worker and mock its behavior
      const workerSpy = jasmine.createSpyObj('Worker', [
        'postMessage',
        'terminate',
      ]);
      workerSpy.onmessage = null;
      workerSpy.onerror = null;

      // Mock the global Worker constructor
      spyOn(window, 'Worker').and.returnValue(workerSpy as Worker);

      // Act
      service.runChallengeWithWorker(2024, 1).then((result) => {
        // Assert
        expect(result).toEqual(mockWorkerResponse);
        done();
      });

      // Simulate the worker posting a message
      workerSpy.onmessage({ data: mockWorkerResponse });
    });

    it('should reject when worker encounters an error', (done) => {
      const mockErrorMessage = 'Worker failed';
      const mockInput = ['mock input data']; // Your mock input data

      // Mock the observable from the input service
      inputService.loadInput.and.returnValue(of(mockInput));

      // Create a spy for the Web Worker and mock its behavior
      const workerSpy = jasmine.createSpyObj('Worker', [
        'postMessage',
        'terminate',
      ]);
      workerSpy.onmessage = null;
      workerSpy.onerror = null;

      // Mock the global Worker constructor
      spyOn(window, 'Worker').and.returnValue(workerSpy as Worker);

      // Act
      service.runChallengeWithWorker(2024, 1).catch((error) => {
        // Assert
        expect(error).toBe(mockErrorMessage);
        done();
      });

      // Simulate the worker encountering an error
      workerSpy.onerror({ message: mockErrorMessage });
    });
  });
});
