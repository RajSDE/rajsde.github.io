import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioData } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/data/repositories.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<PortfolioData> {
    return this.http.get<PortfolioData>(this.jsonUrl);
  }
}