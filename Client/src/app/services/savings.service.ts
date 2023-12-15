import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewMonthSavings} from "../models/NewMonthSavings";

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  constructor(private http: HttpClient) { }

  addMonthSavings(newMonthSavings: NewMonthSavings): Observable<void> {
    return this.http.post<void>(`http://localhost:3001/savings`, newMonthSavings)
  }
}
