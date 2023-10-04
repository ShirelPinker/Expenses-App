import {Component, OnInit} from '@angular/core';
import {CategoriesExpenses} from "../../models/CategoriesExpenses";
import {ExpensesService} from "../../services/expenses.service";
import {Observable} from "rxjs";
import {ExpenseItem} from "../../models/ExpenseItem";
import {Months} from "../../models/MonthsEnum";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/Category";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-monthly-expenses-page',
  templateUrl: './monthly-expenses-page.component.html',
  styleUrls: ['./monthly-expenses-page.component.css']
})
export class MonthlyExpensesPageComponent implements OnInit {
  monthExpensesFromDB: ExpenseItem[] = [];
  lastMonth: string = Object.keys(Months)[new Date().getMonth() - 1];
  expensesByCategories: CategoriesExpenses = {};
  showSpinner: boolean = true;
  selectedMonth: string = ''
  monthsOptions: Months[] = [];
  categoriesNames: string[] = [];
  faSpinner = faSpinner;

  constructor(private expensesService: ExpensesService, private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categoriesList: Category[]) => {
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


