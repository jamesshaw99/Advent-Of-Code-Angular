import type { MockedObject } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearComponent, DailyResult } from './year.component';
import { RunnerService } from '../services/runner.service';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { RunnerResults } from '../models/RunnerResults';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('YearComponent', () => {
    let component: YearComponent;
    let fixture: ComponentFixture<YearComponent>;
    let mockRunnerService: MockedObject<RunnerService>;
    let mockChallengeInfoService: MockedObject<ChallengeInfoService>;
    let mockParams: Subject<{
        year: number;
    }>;
    let mockRouter: MockedObject<Router>;

    function flushPromises() {
        return new Promise((resolve) => setTimeout(resolve, 0));
    }

    function latestVm() {
        let vm!: {
            year: number;
            noDays: number;
            dailyResults: DailyResult[];
            completionPercentage: number;
        };
        component.vm$.subscribe((v) => (vm = v));
        return vm;
    }

    beforeEach(async () => {
        mockRunnerService = {
            runAllChallenges: vi.fn().mockName("RunnerService.runAllChallenges")
        } as unknown as MockedObject<RunnerService>;
        mockChallengeInfoService = {
            getChallengeTitle: vi.fn().mockName("ChallengeInfoService.getChallengeTitle"),
            getNumberOfDaysForYear: vi.fn().mockName("ChallengeInfoService.getNumberOfDaysForYear")
        } as unknown as MockedObject<ChallengeInfoService>;
        mockRouter = {
            navigate: vi.fn().mockName("Router.navigate")
        } as unknown as MockedObject<Router>;
        mockParams = new Subject<{
            year: number;
        }>();

        await TestBed.configureTestingModule({
            imports: [MatProgressBarModule, YearComponent],
            providers: [
                { provide: RunnerService, useValue: mockRunnerService },
                { provide: ChallengeInfoService, useValue: mockChallengeInfoService },
                { provide: ActivatedRoute, useValue: { params: mockParams } },
                { provide: Router, useValue: mockRouter },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(YearComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should set the year and day count from route parameters', async () => {
            const mockSubject = new Subject<RunnerResults>();
            mockRunnerService.runAllChallenges.mockResolvedValue(mockSubject);
            mockChallengeInfoService.getChallengeTitle.mockReturnValue(of(''));
            mockChallengeInfoService.getNumberOfDaysForYear.mockReturnValue(25);

            fixture.detectChanges();
            mockParams.next({ year: 2023 });
            await flushPromises();

            expect(latestVm().year).toBe(2023);
            expect(latestVm().noDays).toBe(25);
            expect(mockRunnerService.runAllChallenges).toHaveBeenCalledWith(2023);
        });

        it('should insert incoming results in day order regardless of arrival order', async () => {
            const mockSubject = new Subject<RunnerResults>();
            mockRunnerService.runAllChallenges.mockResolvedValue(mockSubject);
            mockChallengeInfoService.getChallengeTitle.mockImplementation((_year, day) => of(`Challenge Day ${day}`));
            mockChallengeInfoService.getNumberOfDaysForYear.mockReturnValue(25);

            fixture.detectChanges();
            mockParams.next({ year: 2023 });
            await flushPromises();

            mockSubject.next({ day: 3, part1: 'Result 3A', part2: 'Result 3B', timePart1: 0, timePart2: 0 });
            await flushPromises();
            mockSubject.next({ day: 1, part1: 'Result 1A', part2: 'Result 1B', timePart1: 0, timePart2: 0 });
            await flushPromises();
            mockSubject.next({ day: 2, part1: 'Result 2A', part2: 'Result 2B', timePart1: 0, timePart2: 0 });
            await flushPromises();

            expect(latestVm().dailyResults.map((r) => r.day)).toEqual([1, 2, 3]);
            expect(latestVm().completionPercentage).toBe((3 / 25) * 100);
        });

        it('should stop reflecting a previous year once navigation switches to a new one', async () => {
            const subjectFor2023 = new Subject<RunnerResults>();
            const subjectFor2024 = new Subject<RunnerResults>();
            mockRunnerService.runAllChallenges.mockImplementation((year: number) => Promise.resolve(year === 2023 ? subjectFor2023 : subjectFor2024));
            mockChallengeInfoService.getChallengeTitle.mockImplementation((_year, day) => of(`Challenge Day ${day}`));
            mockChallengeInfoService.getNumberOfDaysForYear.mockReturnValue(25);

            fixture.detectChanges();
            mockParams.next({ year: 2023 });
            await flushPromises();

            // Navigate away to 2024 before 2023 finishes streaming results.
            mockParams.next({ year: 2024 });
            await flushPromises();

            // A late result from the abandoned 2023 pipeline should not leak in.
            subjectFor2023.next({ day: 1, part1: 'Stale 1A', part2: 'Stale 1B', timePart1: 0, timePart2: 0 });
            await flushPromises();

            subjectFor2024.next({ day: 5, part1: '2024 Result A', part2: '2024 Result B', timePart1: 0, timePart2: 0 });
            await flushPromises();

            expect(latestVm().year).toBe(2024);
            expect(latestVm().dailyResults).toEqual([
                { day: 5, part1: '2024 Result A', part2: '2024 Result B', timePart1: 0, timePart2: 0, title: 'Challenge Day 5' },
            ]);
        });

        it('should stop updating vm$ after the component is destroyed', async () => {
            const mockSubject = new Subject<RunnerResults>();
            mockRunnerService.runAllChallenges.mockResolvedValue(mockSubject);
            mockChallengeInfoService.getChallengeTitle.mockImplementation((_year, day) => of(`Challenge Day ${day}`));
            mockChallengeInfoService.getNumberOfDaysForYear.mockReturnValue(25);

            fixture.detectChanges();
            mockParams.next({ year: 2023 });
            await flushPromises();

            const vmBeforeDestroy = latestVm();
            fixture.destroy();

            mockSubject.next({ day: 1, part1: 'Late 1A', part2: 'Late 1B', timePart1: 0, timePart2: 0 });
            await flushPromises();

            expect(latestVm()).toEqual(vmBeforeDestroy);
        });
    });

    describe('goBack', () => {
        it('should navigate to the root on goBack', () => {
            component.goBack();

            expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
        });
    });
});
