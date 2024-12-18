import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { InputService } from '../input.service';
import { provideHttpClient } from '@angular/common/http';

describe('InputService', () => {
  let service: InputService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InputService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(InputService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadInputFromFile', () => {
    it('should load input from file and split into trimmed lines', () => {
      // Arrange
      const mockText = 'line1\nline2\nline3';
      const mockResponse = ['line1', 'line2', 'line3'];
      const year = 2023;
      const day = 5;

      // Act
      service.loadInputFromFile(year, day).subscribe(data => {
        // Assert
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${year}/day${day}.txt`);
      expect(req.request.method).toBe('GET');
      req.flush(mockText);
    });

    it('should handle empty file and return empty array', () => {
      // Arrange
      const mockText = '';
      const mockResponse: string[] = [''];
      const year = 2023;
      const day = 5;

      // Act
      service.loadInputFromFile(year, day).subscribe(data => {
        // Assert
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${year}/day${day}.txt`);
      expect(req.request.method).toBe('GET');
      req.flush(mockText);
    });

    it('should handle file with empty lines and return them', () => {
      // Arrange
      const mockText = 'line1\n\nline2\n\n\nline3';
      const mockResponse = ['line1', '', 'line2', '', '', 'line3'];
      const year = 2023;
      const day = 5;

      // Act
      service.loadInputFromFile(year, day).subscribe(data => {
        // Assert
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${year}/day${day}.txt`);
      expect(req.request.method).toBe('GET');
      req.flush(mockText);
    });
  });
});
