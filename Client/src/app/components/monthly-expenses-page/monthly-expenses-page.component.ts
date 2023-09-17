import {Component, OnInit} from '@angular/core';
import {CategoriesExpenses} from "../../models/CategoriesExpenses";
import {ExpensesService} from "../../services/expenses.service";
import {Observable} from "rxjs";
import {ExpenseItem} from "../../models/ExpenseItem";
import {Months} from "../../models/MonthsEnum";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/Category";


@Component({
  selector: 'app-monthly-expenses-page',
  templateUrl: './monthly-expenses-page.component.html',
  styleUrls: ['./monthly-expenses-page.component.css']
})
export class MonthlyExpensesPageComponent implements OnInit {
  monthExpensesFromDB: ExpenseItem[] = [];
  lastMonth: string = '';
  expensesByCategories: CategoriesExpenses = {};
  showSpinner: boolean = true;
  selectedMonth: string = ''
  monthsOptions: Months[] = [];
  categoriesNames : string[]=[]
  constructor(private expensesService: ExpensesService, private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.lastMonth = this.getLastMonthAsString()
    this.categoriesService.getCategories().subscribe((categoriesList:Category[]) => {
      for (const category of categoriesList) {
        this.categoriesNames.push(category.name);
      }
    })

    this.expensesService.getExpensesByMonth(this.lastMonth)
      .subscribe((expensesData: ExpenseItem[]) => {
        this.monthExpensesFromDB = expensesData
        this.showSpinner = false;
        this.initializeExpensesByCategories()

      })
    this.selectedMonth = this.lastMonth
    this.monthsOptions = Object.values(Months);

  }

  initializeExpensesByCategories() {
    for (const category of this.categoriesNames) {
      this.expensesByCategories[category] = 0
    }
    for (const expense of this.monthExpensesFromDB) {
      this.expensesByCategories[expense.categoryName] += expense.amount
    }
  }

  getLastMonthAsString() {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return monthNames[lastMonth.getMonth()];
  }

  onMonthClicked() {
    this.showSpinner = true;
    this.expensesByCategories = {};

    this.expensesService.getExpensesByMonth(this.selectedMonth)
      .subscribe((expensesData: ExpenseItem[]) => {
        this.monthExpensesFromDB = expensesData
        this.showSpinner = false;
        this.initializeExpensesByCategories()

      })
  }

}


