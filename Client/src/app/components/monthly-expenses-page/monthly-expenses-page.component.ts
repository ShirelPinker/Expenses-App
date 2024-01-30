import {Component, OnInit} from '@angular/core';
import {CategoriesExpenses} from "../../models/CategoriesExpenses";
import {ExpensesService} from "../../services/expenses.service";
import {debounceTime, filter, map, merge, Observable, startWith, switchMap, take, tap} from "rxjs";
import {ExpenseItem} from "../../models/ExpenseItem";
import {Months} from "../../models/MonthsEnum";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/Category";
import {
  faArrowLeft,
  faArrowRight,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {CategoryExpensesComponent} from "../category-expenses/category-expenses.component";
import {ExpenseUserChangesService} from "../../services/expense-user-changes.service";
import {UpdatedExpense} from "../../models/UpdatedExpense";


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
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;
  showExpensesForm: FormGroup;
  total: number = 0;
  monthsIndexed = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  constructor(private expenseUserChangesService: ExpenseUserChangesService, private dialog: MatDialog, private expensesService: ExpensesService, private categoriesService: CategoriesService, private formBuilder: FormBuilder) {
    this.showExpensesForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.setForm()
    const sortChanges$ = this.showExpensesForm.controls['selectedSortOrder'].valueChanges
    const yearChanges$ = this.showExpensesForm.controls['year'].valueChanges
    const monthChanges$ = this.showExpensesForm.controls['month'].valueChanges
    const yearChangesFiltered$ = yearChanges$.pipe(
      debounceTime(300),
      filter((year) => year > 2000)
    );

    this.categoriesService.getCategories().pipe(
      tap((categoriesList: Category[]) => {
        for (const category of categoriesList) {
          this.categoriesNames.push(category.name);
        }
      }), switchMap(() => this.expensesService.getExpensesByMonthAndYear(this.showExpensesForm.get('month')!.value, this.showExpensesForm.get('year')!.value))
    ).subscribe((expensesData: ExpenseItem[]) => {
      this.initializeMonthPage(expensesData);
    })
    this.listenToYearOrMonthChanges(merge(monthChanges$, yearChangesFiltered$));
    sortChanges$.subscribe(() => this.sortCategories())
    this.expenseUserChangesService.getDeletedId().subscribe(
      (deletedId) => this.onDeleteExpense(deletedId)
    )
    this.expenseUserChangesService.getUpdatedExpense().subscribe(
      (updatedExpense) => this.onExpenseUpdated(updatedExpense)
    )
  }

  onDeleteExpense(deletedId: number) {
    this.monthExpensesFromDB = this.monthExpensesFromDB.filter(item => item.id != deletedId);
    this.initializeMonthPage(this.monthExpensesFromDB)
  }

  onExpenseUpdated(updatedExpense: UpdatedExpense) {
    this.monthExpensesFromDB = this.monthExpensesFromDB.map(item => {
      if (item.id === updatedExpense.id) {
        return {...item, ...updatedExpense};
      }
      return item;
    });
    this.initializeMonthPage(this.monthExpensesFromDB)
  }

  listenToYearOrMonthChanges(yearOrMonthChanged$: Observable<string | number>) {
    yearOrMonthChanged$.pipe(
      map(() => ({
        month: this.showExpensesForm.controls['month'].value,
        year: this.showExpensesForm.controls['year'].value
      })),
      tap(() => {
        this.showSpinner = true;
        this.expensesByCategories = {};
      }),
      switchMap((formValues) => this.expensesService.getExpensesByMonthAndYear(formValues.month, formValues.year))
    ).subscribe((expensesData: ExpenseItem[]) => {
      this.showExpensesForm.get('selectedSortOrder')!.setValue('amount');
      this.initializeMonthPage(expensesData)

    })
  }

  initializeMonthPage(expensesData: ExpenseItem[]) {
    this.monthExpensesFromDB = expensesData
    this.initializeExpensesByCategories()
    this.sortCategories()
    this.total = this.calculateMonthlyExpensesSum();
    this.showSpinner = false;
  }

  onPreviousMonthClicked() {
    const currentMonth = this.showExpensesForm.get('month')!.value;
    const currentYear = this.showExpensesForm.get('year')!.value;
    const currentMonthIndex = this.monthsIndexed.indexOf(currentMonth)
    if (currentMonthIndex == 0) {
      this.showExpensesForm.get('month')!.setValue(Months.December);
      this.showExpensesForm.get('year')!.setValue(currentYear - 1)
    } else {
      const previousMonth = this.monthsIndexed[currentMonthIndex - 1];
      this.showExpensesForm.get('month')!.setValue(previousMonth);
    }
  }

  onNextMonthClicked() {
    const currentMonth = this.showExpensesForm.get('month')!.value;
    const currentYear = this.showExpensesForm.get('year')!.value;
    const currentMonthIndex = this.monthsIndexed.indexOf(currentMonth)
    if (currentMonthIndex == 11) {
      this.showExpensesForm.get('month')!.setValue(Months.January);
      this.showExpensesForm.get('year')!.setValue(currentYear + 1)
    } else {
      const nextMonth = this.monthsIndexed[currentMonthIndex + 1];
      this.showExpensesForm.get('month')!.setValue(nextMonth);
    }
  }

  sortCategories() {
    this.categoriesNames.sort((a, b) => {
      if (this.showExpensesForm.get('selectedSortOrder')!.value === 'alphabetical') {
        return a.localeCompare(b);
      } else if (this.showExpensesForm.get('selectedSortOrder')!.value === 'amount') {
        return this.expensesByCategories[b] - this.expensesByCategories[a];
      }
      return 0;
    });
  }

  setForm() {
    const {year, month} = this.initializeDate()
    this.showExpensesForm = this.formBuilder.group({
      year: year,
      month: month,
      selectedSortOrder: 'amount'
    });
  }

  initializeDate() {
    const currentMonth = Object.keys(Months)[new Date().getMonth()]
    if (currentMonth === Months.January) {
      return {
        year: new Date().getFullYear() - 1,
        month: Months.December
      }

    } else {
      return {
        year: new Date().getFullYear(),
        month: Object.keys(Months)[new Date().getMonth() - 1]
      }
    }
  }

  initializeExpensesByCategories() {
    for (const category of this.categoriesNames) {
      this.expensesByCategories[category] = 0
    }
    for (const expense of this.monthExpensesFromDB) {
      this.expensesByCategories[expense.categoryName] += expense.amount
    }
  }

  calculateMonthlyExpensesSum() {
    let sum = 0;
    for (const expense of this.monthExpensesFromDB) {
      sum += expense.amount
    }
    return sum;
  }

  onCategoryClicked(category: string) {
    const dialogRef = this.dialog.open(CategoryExpensesComponent, {
      width: '400px',
      disableClose: false,
      data: {
        month: this.showExpensesForm.get('month')!.value,
        year: this.showExpensesForm.get('year')!.value,
        categoryName: category
      }
    })
  };

  protected readonly Object = Object;
}


