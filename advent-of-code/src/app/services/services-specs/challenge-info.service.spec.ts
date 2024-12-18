import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ChallengeInfoService } from '../challenge-info.service';
import { provideHttpClient } from '@angular/common/http';

describe('ChallengeInfoService', () => {
  let service: ChallengeInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChallengeInfoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ChallengeInfoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    const requests = httpMock.match((req) => true);
    expect(requests.length).toBe(0, 'There are outstanding HTTP requests!');
  });

  describe('getChallengeInfo', () => {
    it('should fetch challenge info', () => {
      const mockResponse = {
        Title: 'Challenge 1',
        part1Description: ['Part 1'],
        part2Description: ['Part 2'],
      };

      service.getChallengeInfo(2024, 1).subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:3000/scrape/2024/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error when fetching challenge info', () => {
      const defaultResponse = {
        Title: 'No data found',
        part1Description: [],
        part2Description: [],
      };

      service.getChallengeInfo(2024, 1).subscribe((data) => {
        expect(data).toEqual(defaultResponse);
      });

      const req = httpMock.expectOne('http://localhost:3000/scrape/2024/1');
      expect(req.request.method).toBe('GET');
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getChallengeTitles', () => {
    it('should fetch challenge titles', () => {
      // Arrange
      const mockResponses = [
        { title: 'Challenge 1' },
        { title: 'Challenge 2' },
        { title: 'Challenge 3' },
      ];
      const year = 2023;
      const days = 3;

      // Act
      service.getChallengeTitles(year, days).subscribe((data) => {
        // Assert
        expect(data).toEqual([
          { day: 1, title: 'Challenge 1' },
          { day: 2, title: 'Challenge 2' },
          { day: 3, title: 'Challenge 3' },
        ]);
      });

      for (let day = 1; day <= days; day++) {
        const req = httpMock.expectOne(
          `http://localhost:3000/scrape/${year}/${day}`
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponses[day - 1]);
      }
    });

    it('should handle errors and return default title', () => {
      // Arrange
      const year = 2023;
      const days = 3;

      // Act
      service.getChallengeTitles(year, days).subscribe((data) => {
        // Assert
        expect(data).toEqual([
          { day: 1, title: 'No title available' },
          { day: 2, title: 'No title available' },
          { day: 3, title: 'No title available' },
        ]);
      });

      for (let day = 1; day <= days; day++) {
        const req = httpMock.expectOne(
          `http://localhost:3000/scrape/${year}/${day}`
        );
        expect(req.request.method).toBe('GET');
        req.flush('Error', { status: 500, statusText: 'Server Error' });
      }
    });
  });
});
