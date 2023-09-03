import {Component, OnInit} from '@angular/core';
import {CategoriesExpenses} from "../../models/CategoriesExpenses";
import {MockExpensesServerService} from "../../services/mock-expenses-server.service";

@Component({
  selector: 'app-monthly-expenses-page',
  templateUrl: './monthly-expenses-page.component.html',
  styleUrls: ['./monthly-expenses-page.component.css']
})
export class MonthlyExpensesPageComponent {
  categoriesExpenses: CategoriesExpenses;
  categories: string[];
  selectedCategory: string;
  expenseAmount: number = 0;

  constructor(private mockExpensesServerService: MockExpensesServerService) {
    this.categoriesExpenses = this.mockExpensesServerService.getExpenses()
    this.categories = Object.keys(this.categoriesExpenses);
    this.selectedCategory = this.categories[0];
  }

  onAddExpense() {
    this.categoriesExpenses[this.selectedCategory] += this.expenseAmount
    this.expenseAmount = 0;
  }

  onSubmit() {
    this.mockExpensesServerService.saveExpensesForm(this.categoriesExpenses)
  }

  getCategoryAmount(category: string) {
    return this.categoriesExpenses[category]
  }
}


