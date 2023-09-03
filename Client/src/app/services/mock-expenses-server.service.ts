import {Injectable} from '@angular/core';
import {CategoriesExpenses} from "../models/CategoriesExpenses";

@Injectable({
  providedIn: 'root'
})
export class MockExpensesServerService {
  expenses: CategoriesExpenses = {
    "Health": 100,
    "Dates": 250,
    "Gym": 200,
    "Social": 500,
    "Boutique Food": 1200,
    "Supermarket": 1300
  }

  constructor() {
  }

  getExpenses() {
    return this.expenses
  }

  saveExpensesForm(expensesForm: CategoriesExpenses): void {
    this.expenses = expensesForm
  }
}
