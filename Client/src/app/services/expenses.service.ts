import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {delay, Observable} from "rxjs";
import {ExpenseItem} from "../models/ExpenseItem";
import {NewExpenseItem} from "../models/NewExpenseItem";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http: HttpClient) {
  }

  getExpensesByMonthAndYear(month: string, year: number): Observable<ExpenseItem[]> {
    return this.http.get<ExpenseItem[]>(`http://localhost:3001/expenses/?month=${month}&year=${year}`).pipe(delay(1000))
  }

  getExpensesByMonth(month: string): Observable<ExpenseItem[]> {
    return this.http.get<ExpenseItem[]>(`http://localhost:3001/expenses/?month=${month}`).pipe(delay(1000))
  }

  getExpensesByYear(year: number): Observable<ExpenseItem[]> {
    return this.http.get<ExpenseItem[]>(`http://localhost:3001/expenses/?year=${year}`).pipe(delay(1000))
  }

  addExpense(newExpense: NewExpenseItem): Observable<void> {
    return this.http.post<void>(`http://localhost:3001/expenses/`, newExpense).pipe(delay(1000))

  }
}
