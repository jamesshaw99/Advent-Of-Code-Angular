import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor(private http: HttpClient) { }

  loadInputFromFile(year: number, day: number): Observable<string[]> {
    const fileUrl = `${year}/day${day}.txt`;
    return this.http.get(fileUrl, { responseType: 'text' }).pipe(
      map((text: string) => text.split('\n').map(line => line.trim()))
    );
  }
}
