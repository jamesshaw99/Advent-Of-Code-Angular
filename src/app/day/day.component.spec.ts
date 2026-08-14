import type { MockedObject } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayComponent, ChallengeResult, ChallengeDescription } from './day.component';
import { RunnerService } from '../services/runner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { of, Subject } from 'rxjs';

describe('DayComponent', () => {
    let component: DayComponent;
    let fixture: ComponentFixture<DayComponent>;
    let mockRunnerService: MockedObject<RunnerService>;
    let mockChallengeInfoService: MockedObject<ChallengeInfoService>;
    let mockParams: Subject<{
        year: number;
        day: number;
    }>;
    let mockRouter: MockedObject<Router>;

    function flushPromises() {
        return new Promise((resolve) => setTimeout(resolve, 0));
    }

    function latestVm() {
        let vm!: {
            year: number;
            day: number;
            result: ChallengeResult | null;
            challengeInfo: ChallengeDescription | null;
        };
        component.vm$.subscribe((v) => (vm = v));
        return vm;
    }

    beforeEach(async () => {
        mockRunnerService = {
            runChallenge: vi.fn().mockName("RunnerService.runChallenge")
        } as unknown as MockedObject<RunnerService>;
        mockChallengeInfoService = {
            getChallengeInfo: vi.fn().mockName("ChallengeInfoService.getChallengeInfo")
        } as unknown as MockedObject<ChallengeInfoService>;
        mockRouter = {
            navigate: vi.fn().mockName("Router.navigate")
        } as unknown as MockedObject<Router>;
        mockParams = new Subject<{
            year: number;
            day: number;
        }>();

        await TestBed.configureTestingModule({
            imports: [DayComponent],
            providers: [
                { provide: RunnerService, useValue: mockRunnerService },
                { provide: ChallengeInfoService, useValue: mockChallengeInfoService },
                { provide: ActivatedRoute, useValue: { params: mockParams } },
                { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DayComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should fetch challenge info and run challenge on init', async () => {
            const challengeInfo = {
                title: 'Test Challenge',
                part1Description: ['Part 1 Description'],
                part2Description: ['Part 2 Description'],
            };
            mockChallengeInfoService.getChallengeInfo.mockReturnValue(of(challengeInfo));

            const result = { part1: 'Part 1 Result', part2: 'Part 2 Result', timePart1: 0, timePart2: 0 };
            mockRunnerService.runChallenge.mockResolvedValue(result);

            fixture.detectChanges();
            mockParams.next({ year: 2023, day: 5 });
            await flushPromises();

            expect(latestVm().year).toBe(2023);
            expect(latestVm().day).toBe(5);
            expect(latestVm().challengeInfo).toEqual(challengeInfo);
            expect(mockChallengeInfoService.getChallengeInfo).toHaveBeenCalledWith(2023, 5);
            expect(latestVm().result).toEqual(result);
            expect(mockRunnerService.runChallenge).toHaveBeenCalledWith(2023, 5);
        });

        it('should stop reflecting a previous day once navigation switches to a new one', async () => {
            const infoFor5 = { title: 'Day 5', part1Description: ['5a'], part2Description: ['5b'] };
            const infoFor6 = { title: 'Day 6', part1Description: ['6a'], part2Description: ['6b'] };
            mockChallengeInfoService.getChallengeInfo.mockImplementation((_year, day) => of(day === 5 ? infoFor5 : infoFor6));

            // runChallenge for day 5 never resolves within this test, simulating a slow/abandoned computation.
            let resolveDay5!: (value: {
                part1: string;
                part2: string;
                timePart1: number;
                timePart2: number;
            }) => void;
            const day5Promise = new Promise<{
                part1: string;
                part2: string;
                timePart1: number;
                timePart2: number;
            }>((resolve) => {
                resolveDay5 = resolve;
            });
            mockRunnerService.runChallenge.mockImplementation((_year, day) => day === 5
                ? day5Promise
                : Promise.resolve({ part1: 'Day 6 result A', part2: 'Day 6 result B', timePart1: 0, timePart2: 0 }));

            fixture.detectChanges();
            mockParams.next({ year: 2023, day: 5 });
            await flushPromises();

            // Navigate away to day 6 before day 5's challenge finishes running.
            mockParams.next({ year: 2023, day: 6 });
            await flushPromises();

            // Day 5's result finally resolves late — it should not leak into the current (day 6) view.
            resolveDay5({ part1: 'Stale day 5 result A', part2: 'Stale day 5 result B', timePart1: 0, timePart2: 0 });
            await flushPromises();

            expect(latestVm().day).toBe(6);
            expect(latestVm().challengeInfo).toEqual(infoFor6);
            expect(latestVm().result).toEqual({ part1: 'Day 6 result A', part2: 'Day 6 result B', timePart1: 0, timePart2: 0 });
        });

        it('should stop updating vm$ after the component is destroyed', async () => {
            mockChallengeInfoService.getChallengeInfo.mockReturnValue(of({ title: 'Test Challenge', part1Description: [], part2Description: [] }));
            let resolveResult!: (value: {
                part1: string;
                part2: string;
                timePart1: number;
                timePart2: number;
            }) => void;
            mockRunnerService.runChallenge.mockReturnValue(new Promise((resolve) => { resolveResult = resolve; }));

            fixture.detectChanges();
            mockParams.next({ year: 2023, day: 5 });
            await flushPromises();

            const vmBeforeDestroy = latestVm();
            fixture.destroy();

            resolveResult({ part1: 'Late result A', part2: 'Late result B', timePart1: 0, timePart2: 0 });
            await flushPromises();

            expect(latestVm()).toEqual(vmBeforeDestroy);
        });
    });

    describe('goBack', () => {
        it('should navigate back to the current year view on goBack', async () => {
            mockChallengeInfoService.getChallengeInfo.mockReturnValue(of({ title: 'Test Challenge', part1Description: [], part2Description: [] }));
            mockRunnerService.runChallenge.mockResolvedValue({ part1: 'a', part2: 'b', timePart1: 0, timePart2: 0 });

            fixture.detectChanges();
            mockParams.next({ year: 2023, day: 5 });
            await flushPromises();

            component.goBack();

            expect(mockRouter.navigate).toHaveBeenCalledWith(['/year/2023']);
        });
    });
});
