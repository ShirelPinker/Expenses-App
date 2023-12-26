import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {FinancialActivity} from "../models/FinancialActivity";
import {UpdatedExpense} from "../models/UpdatedExpense";

@Injectable({
  providedIn: 'root'
})
export class FinancialActivitiesService {
  // private updatedFinancials = new Subject<UpdatedExpense>()

  constructor(private http: HttpClient) {
  }

  addMonthFinancials(newMonthFinancialActivities: FinancialActivity): Observable<void> {
    return this.http.post<void>(`http://localhost:3001/financialActivities`, newMonthFinancialActivities)
  }

  getFinancialActivitiesService(month: string, year: number): Observable<FinancialActivity[]> {
    return this.http.get<FinancialActivity[]>(`http://localhost:3001/financialActivities/?month=${month}&year=${year}`)
  }

  // onExpenseUpdated(updatedExpense: UpdatedExpense) {
  //   this.updatedExpenseSubject.next(updatedExpense)
  //
  // }
}
