import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PortfolioData } from '../models/portfolio';
import { PORTFOLIO_DATA } from '../data/portfolio-data'; // Import the constant

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData(): Observable<PortfolioData> {
    // Return the constant data instantly as an Observable
    return of(PORTFOLIO_DATA);
  }
}