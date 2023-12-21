import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NewMonthFinancialActivities} from "../models/NewMonthFinancialActivities";

@Injectable({
  providedIn: 'root'
})
export class FinancialActivitiesService {

  constructor(private http: HttpClient) { }

  addMonthFinancials(newMonthFinancialActivities: NewMonthFinancialActivities): Observable<void> {
    return this.http.post<void>(`http://localhost:3001/financialActivities`, newMonthFinancialActivities)
  }
  getFinancialActivitiesService(): Observable<void> {
    return this.http.get<void>(`http://localhost:3001/financialActivities`)
  }
}
