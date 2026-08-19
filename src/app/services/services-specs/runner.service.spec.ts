import type { Mock, MockedObject } from "vitest";
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController, } from '@angular/common/http/testing';
import { RunnerService } from '../runner.service';
import { InputService } from '../input.service';
import { challengesByYear } from '../../helpers/challenge-definitions';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { RunnerResults } from '../../models/RunnerResults';
import { day } from '../../helpers/day';

describe('RunnerService', () => {
    let service: RunnerService;
    let inputService: MockedObject<InputService>;
    let httpMock: HttpTestingController;
    let mockChallengesByYear: Record<number, Record<number, day>>;

    beforeEach(() => {
        inputService = {
            loadInput: vi.fn().mockName("InputService.loadInput")
        } as unknown as MockedObject<InputService>;

        mockChallengesByYear = {
            2024: {
                1: (() => {
                    const instance = new day();
                    vi.spyOn(instance, 'run').mockResolvedValue({
                        part1: 'result1',
                        part2: 'result1',
                        timePart1: 0,
                        timePart2: 0,
                    });
                    return instance;
                })(),
                2: (() => {
                    const instance = new day();
                    vi.spyOn(instance, 'run').mockResolvedValue({
                        part1: 'result2',
                        part2: 'result2',
                        timePart1: 0,
                        timePart2: 0,
                    });
                    return instance;
                })(),
                3: (() => {
                    const instance = new day();
                    vi.spyOn(instance, 'run').mockResolvedValue({
                        part1: 'result3',
                        part2: 'result3',
                        timePart1: 0,
                        timePart2: 0,
                    });
                    return instance;
                })(),
            },
        };

        TestBed.configureTestingModule({
            providers: [
                RunnerService,
                { provide: InputService, useValue: inputService },
                provideHttpClient(withXhr()),
                provideHttpClientTesting(),
            ],
        });

        service = TestBed.inject(RunnerService);
        httpMock = TestBed.inject(HttpTestingController);

        service.challenges = {};
        service.initializeChallenges(mockChallengesByYear);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('initializeChallenges', () => {
        it('should initialize challenges from challengesByYear', () => {
            // Act
            service.initializeChallenges(mockChallengesByYear);

            // Assert
            expect(service['challenges'][2024][1]).toBeDefined();
            expect(service['challenges'][2024][2]).toBeDefined();
        });
    });

    describe('getYears', () => {
        it('should return years with challenges', () => {
            // Arrange
            service.initializeChallenges(challengesByYear);

            // Act
            const years = service.getYears();

            // Assert
            expect(years.length).toBeGreaterThan(0);
        });
    });

    describe('runAllChallenges', () => {
        it('should run all challenges for a given year', async () => {
            vi.useFakeTimers();
            try {
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

                vi.spyOn(service, 'runChallenge').mockImplementation((_year: number, day: number) => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(mockResults.find((result) => result.day === day)!);
                        }, 100);
                    });
                });

                // Act
                const emittedResults: RunnerResults[] = [];
                const subjectPromise = service.runAllChallenges(year);

                subjectPromise.then((subject) => {
                    subject.subscribe((result) => {
                        emittedResults.push(result);
                    });
                });

                await vi.advanceTimersByTimeAsync(300);

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
            } finally {
                vi.useRealTimers();
            }
        });
    });

    describe('runChallenge', () => {
        let workerSpy: Mock<typeof Worker>;
        let mockWorker: Worker;

        beforeEach(() => {
            mockWorker = {
                postMessage: vi.fn().mockName('postMessage'),
                terminate: vi.fn().mockName('terminate'),
                onmessage: null,
                onerror: null,
            } as unknown as Worker;

            window.Worker ??= class { } as unknown as typeof Worker;
            workerSpy = vi.spyOn(window, 'Worker').mockImplementation(class {
                constructor() { return mockWorker; }
            } as unknown as typeof Worker);
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
            inputService.loadInput.mockReturnValue(of(['test input']));

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
            inputService.loadInput.mockReturnValue(of(['test input']));

            setTimeout(() => {
                if (mockWorker.onerror) {
                    mockWorker.onerror({
                        message: 'Worker error occurred',
                    } as ErrorEvent);
                }
            }, 10);

            //Act & Assert
            await expect(service.runChallenge(2024, 1)).rejects.toEqual({ message: 'Worker error occurred' });
            expect(mockWorker.terminate).toHaveBeenCalled();
        });

        it('should reject if inputService.loadInput fails', async () => {
            //Arrange
            inputService.loadInput.mockReturnValue(throwError(() => 'Input loading error'));

            //Act & Assert
            await expect(service.runChallenge(2024, 1)).rejects.toEqual('Input loading failed: Input loading error');
            expect(mockWorker.postMessage).not.toHaveBeenCalled();
            expect(mockWorker.terminate).toHaveBeenCalled();
        });
    });
});
