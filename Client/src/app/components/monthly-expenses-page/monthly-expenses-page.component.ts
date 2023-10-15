import {Component, OnInit} from '@angular/core';
import {CategoriesExpenses} from "../../models/CategoriesExpenses";
import {ExpensesService} from "../../services/expenses.service";
import {debounceTime, filter, Observable, switchMap, tap} from "rxjs";
import {ExpenseItem} from "../../models/ExpenseItem";
import {Months} from "../../models/MonthsEnum";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/Category";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {CategoryExpensesComponent} from "../category-expenses/category-expenses.component";


@Component({
  selector: 'app-monthly-expenses-page',
  templateUrl: './monthly-expenses-page.component.html',
  styleUrls: ['./monthly-expenses-page.component.css']
})
export class MonthlyExpensesPageComponent implements OnInit {
  monthExpensesFromDB: ExpenseItem[] = [];
  expensesByCategories: CategoriesExpenses = {};
  showSpinner: boolean = true;
  Months = Months;
  categoriesNames: string[] = [];
  faSpinner = faSpinner;
  expensesDateForm: FormGroup;
  total: number = 0;

  constructor(private dialog: MatDialog, private expensesService: ExpensesService, private categoriesService: CategoriesService, private formBuilder: FormBuilder) {
    this.expensesDateForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.setForm()
    const combinedFormValues$ = this.expensesDateForm.valueChanges;
    combinedFormValues$.pipe(
      debounceTime(300),
      filter((formValues) => formValues.year > 2000),
      tap((formValues) => {
        console.log(formValues.month, formValues.year, formValues)
        this.showSpinner = true;
        this.expensesByCategories = {};
      }),
      switchMap((formValues) => this.expensesService.getExpensesByMonthAndYear(formValues.month, formValues.year))
    ).subscribe((expensesData: ExpenseItem[]) => {
      this.monthExpensesFromDB = expensesData
      this.showSpinner = false;
      this.initializeExpensesByCategories()
    })

    this.categoriesService.getCategories().subscribe((categoriesList: Category[]) => {
      for (const category of categoriesList) {
        this.categoriesNames.push(category.name);
      }
    })

    this.expensesService.getExpensesByMonthAndYear(this.expensesDateForm.get('month')!.value, this.expensesDateForm.get('year')!.value)
      .subscribe((expensesData: ExpenseItem[]) => {
        this.monthExpensesFromDB = expensesData
        this.showSpinner = false;
        this.initializeExpensesByCategories()
        this.total = this.calculateMonthlyExpensesSum()
      })
  }

  setForm() {
    this.expensesDateForm = this.formBuilder.group({
      year: new Date().getFullYear(),
      month: Object.keys(Months)[new Date().getMonth() - 1]
    });
  }

  initializeExpensesByCategories() {
    for (const category of this.categoriesNames) {
      this.expensesByCategories[category] = 0
    }
    for (const expense of this.monthExpensesFromDB) {
      this.expensesByCategories[expense.categoryName] += expense.amount
    }
  }

  calculateMonthlyExpensesSum(){
    let sum = 0;
    for (const expense of this.monthExpensesFromDB){
      sum += expense.amount
    }
    return sum;
  }

  onCategoryClicked(category: string) {
    const dialogRef = this.dialog.open(CategoryExpensesComponent, {
      width: '400px',
      disableClose: false,
      data: {
        month: this.expensesDateForm.get('month')!.value,
        year: this.expensesDateForm.get('year')!.value,
        categoryName: category
      }
    })
  };

  protected readonly Object = Object;
}


