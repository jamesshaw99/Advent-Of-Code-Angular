import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor(private http: HttpClient) { }

  loadInput(year: number, day: number): Observable<string[]> {
    return this.http.get<string>(`http://localhost:3000/challenge/${year}/${day}`).pipe(
      map((text: string) => text.trimEnd().split('\n').map(line => line.trim()))
    );
  }
}
