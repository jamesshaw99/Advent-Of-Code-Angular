import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting, } from '@angular/common/http/testing';
import { ChallengeInfoService } from '../challenge-info.service';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { ChallengeInfo } from '../../models/ChallengeInfo';
import { challengesByYear } from '../../helpers/challenge-definitions';

describe('ChallengeInfoService', () => {
    let service: ChallengeInfoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChallengeInfoService,
                provideHttpClient(withXhr()),
                provideHttpClientTesting(),
            ],
        });

        vi.spyOn(console, 'error').mockReturnValue(undefined); //supress during tests
        service = TestBed.inject(ChallengeInfoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        const requests = httpMock.match(() => true);
        expect(requests.length, 'There are outstanding HTTP requests!').toBe(0);
    });

    describe('getNumberOfDaysForYear', () => {
        it('should return the number of days actually defined for a real year', () => {
            // Arrange
            const [yearWithChallenges] = Object.keys(challengesByYear).map(Number);
            const expectedDays = Object.keys(challengesByYear[yearWithChallenges]).length;

            // Act
            const result = service.getNumberOfDaysForYear(yearWithChallenges);

            // Assert
            expect(result).toBe(expectedDays);
        });

        it('should return 0 if no challenges exist for the year', () => {
            // Act
            const result = service.getNumberOfDaysForYear(1900);

            // Assert
            expect(result).toBe(0);
        });
    });

    describe('getChallengeInfo', () => {
        it('should fetch challenge info from storage if available', () => {
            //Arrange
            service['challengeInfo'] = {
                2024: {
                    1: new ChallengeInfo('Challenge 1', 'Part 1', 'Part 2'),
                },
            };

            //Act
            service.getChallengeInfo(2024, 1).subscribe((data) => {
                //Assert
                expect(data).toEqual(new ChallengeInfo('Challenge 1', 'Part 1', 'Part 2'));
            });
        });

        it('should fetch challenge info from api if not in storage', () => {
            //Arrange
            const mockResponse = new ChallengeInfo('Challenge 1', 'Part 1', 'Part 2');

            //Act
            service.getChallengeInfo(2024, 1).subscribe((data) => {
                //Assert
                expect(data).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('http://localhost:3000/scrape/2024/1');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should handle error when fetching challenge info', () => {
            //Arrange
            const defaultResponse = new ChallengeInfo('No data found', '', '');

            //Act
            service.getChallengeInfo(2024, 1).subscribe((data) => {
                //Assert
                expect(data).toEqual(defaultResponse);
            });

            const req = httpMock.expectOne('http://localhost:3000/scrape/2024/1');
            expect(req.request.method).toBe('GET');
            req.flush('Error', { status: 500, statusText: 'Server Error' });
        });
    });

    describe('getChallengeTitle', () => {
        it('should return the cached title if available', async () => {
            const year = 2025;
            const day = 1;
            service['challengeInfo'] = {
                [year]: {
                    [day]: { title: 'Cached Challenge Title', part1Description: '', part2Description: '' },
                },
            };

            service.getChallengeTitle(year, day).subscribe((title) => {
                expect(title).toBe('Cached Challenge Title');
                ;
            });
        });

        it('should fetch the title from HTTP if not cached and then cache it', async () => {
            const year = 2025;
            const day = 1;
            const mockResponse = { title: 'Fetched Challenge Title', part1Description: '', part2Description: '' };

            service.getChallengeTitle(year, day).subscribe((title) => {
                expect(title).toBe('Fetched Challenge Title');
                // Verify it was cached
                expect(service['challengeInfo'][year][day]).toEqual(mockResponse);
                ;
            });

            const req = httpMock.expectOne(`http://localhost:3000/scrape/${year}/${day}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('should return "No title available" if the HTTP response has no title', async () => {
            const year = 2025;
            const day = 1;
            const mockResponse = {};

            service.getChallengeTitle(year, day).subscribe((title) => {
                expect(title).toBe('No title available');
                ;
            });

            const req = httpMock.expectOne(`http://localhost:3000/scrape/${year}/${day}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });
});
