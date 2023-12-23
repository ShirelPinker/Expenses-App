import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, Observable} from "rxjs";
import {ExpenseItem} from "../models/ExpenseItem";
import {NewExpenseItem} from "../models/NewExpenseItem";
import {UpdatedExpense} from "../models/UpdatedExpense";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http: HttpClient) {
  }

  getExpensesByMonthAndYear(month: string, year: number): Observable<ExpenseItem[]> {
    return this.http.get<ExpenseItem[]>(`http://localhost:3001/expenses/?month=${month}&year=${year}`)
  }

  getExpensesByMonth(month: string): Observable<ExpenseItem[]> {
    return this.http.get<ExpenseItem[]>(`http://localhost:3001/expenses/?month=${month}`)
  }

  getExpensesByYear(year: number): Observable<ExpenseItem[]> {
    return this.http.get<ExpenseItem[]>(`http://localhost:3001/expenses/?year=${year}`)
  }

  addExpense(newExpense: NewExpenseItem): Observable<void> {
    return this.http.post<void>(`http://localhost:3001/expenses/`, newExpense)
  }

  deleteExpense(expenseId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3001/expenses/${expenseId}`)
  }

  updateExpense(expenseId:number, editedExpense: UpdatedExpense) {
    return this.http.put<void>(`http://localhost:3001/expenses/${expenseId}`, editedExpense)
  }
}
