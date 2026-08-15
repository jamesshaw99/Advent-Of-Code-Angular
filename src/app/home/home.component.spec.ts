import type { MockedObject } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RunnerService } from '../services/runner.service';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let mockRunnerService: MockedObject<RunnerService>;

    beforeEach(() => {
        mockRunnerService = {
            getYears: vi.fn().mockName("RunnerService.getYears")
        } as unknown as MockedObject<RunnerService>;

        mockRunnerService.getYears.mockReturnValue([
            { year: 2020, days: 0, stars: 0 },
            { year: 2021, days: 2, stars: 4 },
            { year: 2022, days: 5, stars: 9 },
        ]);

        TestBed.configureTestingModule({
            imports: [MatIconModule, HomeComponent],
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
            const titleTexts = cardTitles.map((title) =>
                title.nativeElement.textContent.replace(/\s+/g, ' ').trim()
            );

            // Assert
            expect(cardTitles.length).toBe(3);
            expect(titleTexts[0]).toContain('2020');
            expect(titleTexts[0]).toContain('0');
            expect(titleTexts[1]).toContain('2021');
            expect(titleTexts[1]).toContain('4');
            expect(titleTexts[2]).toContain('2022');
            expect(titleTexts[2]).toContain('9');
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
