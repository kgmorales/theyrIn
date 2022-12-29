import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const local = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  findMovie(title: string): Observable<any> {
    return this.http.post(`${local}/findMovie`, { title: title });
  }
}
