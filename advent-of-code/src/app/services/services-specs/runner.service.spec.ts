import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RunnerService } from '../runner.service';
import { InputService } from '../input.service';
import { challengeInstances } from '../../helpers/challenge-definitions';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { RunnerResults } from '../../models/RunnerResults';
import { day } from '../../helpers/day';

describe('RunnerService', () => {
  let service: RunnerService;
  let inputService: jasmine.SpyObj<InputService>;
  let httpMock: HttpTestingController;
  let mockChallengeInstances: {
    year: number,
    day: number,
    instance: day
  }[];

  beforeEach(() => {
    inputService = jasmine.createSpyObj('InputService', ['loadInput']);

    mockChallengeInstances = [
      {
        year: 2024,
        day: 1,
        instance: (() => {
          const instance = new day();
          spyOn(instance, 'run').and.returnValue(Promise.resolve({
            part1: 'result1',
            part2: 'result1',
            timePart1: 0,
            timePart2: 0,
          }));
          return instance;
        })(),
      },
      {
        year: 2024,
        day: 2,
        instance: (() => {
          const instance = new day();
          spyOn(instance, 'run').and.returnValue(Promise.resolve({
            part1: 'result2',
            part2: 'result2',
            timePart1: 0,
            timePart2: 0,
          }));
          return instance;
        })(),
      },
      {
        year: 2024,
        day: 3,
        instance: (() => {
          const instance = new day();
          spyOn(instance, 'run').and.returnValue(Promise.resolve({
            part1: 'result3',
            part2: 'result3',
            timePart1: 0,
            timePart2: 0,
          }));
          return instance;
        })(),
      },
    ];

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
      expect(service['challenges'][2024][1]).toBeDefined();
      expect(service['challenges'][2024][2]).toBeDefined();
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
      const year = 2024;
      const mockResults = [
        {
          day: 1,
          part1: 'result1',
          part2: 'result2',
          timePart1: 0,
          timePart2: 0,
        },
        {
          day: 2,
          part1: 'result1',
          part2: 'result2',
          timePart1: 0,
          timePart2: 0,
        },
        {
          day: 3,
          part1: 'result1',
          part2: 'result2',
          timePart1: 0,
          timePart2: 0,
        },
      ];

      spyOn(service, 'runChallenge').and.callFake(
        (_year: number, day: number) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(mockResults.find((result) => result.day === day)!);
            }, 100);
          });
        }
      );

      // Act
      const emittedResults: RunnerResults[] = [];
      const subjectPromise = service.runAllChallenges(year);

      subjectPromise.then((subject) => {
        subject.subscribe((result) => {
          emittedResults.push(result);
        });
      });

      tick(300);

      // Assert
      expect(emittedResults.length).toBe(3);
      expect(emittedResults[0]).toEqual({
        day: 1,
        part1: 'result1',
        part2: 'result2',
        timePart1: 0,
        timePart2: 0,
      });
      expect(emittedResults[1]).toEqual({
        day: 2,
        part1: 'result1',
        part2: 'result2',
        timePart1: 0,
        timePart2: 0,
      });
      expect(emittedResults[2]).toEqual({
        day: 3,
        part1: 'result1',
        part2: 'result2',
        timePart1: 0,
        timePart2: 0,
      });
    }));
  });

  describe('runChallenge', () => {
    let workerSpy: jasmine.Spy;
    let mockWorker: Worker;

    beforeEach(() => {
      mockWorker = {
        postMessage: jasmine.createSpy('postMessage'),
        terminate: jasmine.createSpy('terminate'),
        onmessage: null,
        onerror: null,
      } as unknown as Worker;

      workerSpy = spyOn(window, 'Worker').and.returnValue(mockWorker);
    });

    it('should return a default message if no challenge is implemented', async () => {
      // Arrange
      const year = 2024;
      const day = 99;

      // Act
      const result = await service.runChallenge(year, day);

      // Assert
      expect(result).toEqual({
        part1: `No challenge implemented for Day ${day} of ${year}`,
        part2: `No challenge implemented for Day ${day} of ${year}`,
        timePart1: 0,
        timePart2: 0,
      });
    });

    it('should resolve with worker result when input is loaded successfully', async () => {
      //Arrange
      inputService.loadInput.and.returnValue(of(['test input']));

      const mockWorkerResult = {
        part1: 'result1',
        part2: 'result2',
        timePart1: 123,
        timePart2: 456,
      };

      setTimeout(() => {
        if (mockWorker.onmessage) {
          mockWorker.onmessage({ data: mockWorkerResult } as MessageEvent);
        }
      }, 10);

      //Act
      const result = await service.runChallenge(2024, 1);

      //Assert
      expect(workerSpy).toHaveBeenCalled();
      expect(mockWorker.postMessage).toHaveBeenCalledWith({
        year: 2024,
        day: 1,
        input: ['test input'],
      });
      expect(result).toEqual(mockWorkerResult);
      expect(mockWorker.terminate).toHaveBeenCalled();
    });

    it('should reject with an error message if the worker fails', async () => {
      //Arrange
      inputService.loadInput.and.returnValue(of(['test input']));

      setTimeout(() => {
        if (mockWorker.onerror) {
          mockWorker.onerror({
            message: 'Worker error occurred',
          } as ErrorEvent);
        }
      }, 10);

      //Act & Assert
      await expectAsync(service.runChallenge(2024, 1)).toBeRejectedWith(
        { message: 'Worker error occurred' }
      );
      expect(mockWorker.terminate).toHaveBeenCalled();
    });

    it('should reject if inputService.loadInput fails', async () => {
      //Arrange
      inputService.loadInput.and.returnValue(
        throwError(() => 'Input loading error')
      );

      //Act & Assert
      await expectAsync(service.runChallenge(2024, 1)).toBeRejectedWith(
        'Input loading failed: Input loading error'
      );
      expect(mockWorker.postMessage).not.toHaveBeenCalled();
      expect(mockWorker.terminate).toHaveBeenCalled();
    });
  });
});
