import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeInfoService {
  private challengeInfo: { [year: number]: { [day: number]: any } } = {};

  constructor(private http: HttpClient) { }

  getChallengeInfo(year: number, day: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/scrape/${year}/${day}`).pipe(
      tap(data => {
        if (!this.challengeInfo[year]) {
          this.challengeInfo[year] = {};
        }
        this.challengeInfo[year][day] = data;
      }),
      catchError(error => {
        // Handle error if any (could log to a service or return empty data)
        console.error(error);
        return of({
          Title: 'No data found',
          part1Description: [],
          part2Description: []
        });
      })
    );
  }

  getChallengeTitles(year: number, days: number): Observable<{ day: number; title: string }[]> {
    const requests = Array.from({ length: days }, (_, day) => 
      this.http.get<any>(`http://localhost:3000/scrape/${year}/${day + 1}`).pipe(
        catchError(() => of({ title: 'No title available' }))
      )
    );
    
    return forkJoin(requests).pipe(
      map(responses => {
        return responses.map((data, index) => ({
          day: index + 1,
          title: data.title
        }));
      })
    );
  }
}