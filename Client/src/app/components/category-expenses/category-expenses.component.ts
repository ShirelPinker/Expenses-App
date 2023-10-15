import {Component, Inject, Input, OnInit} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {ExpenseItem} from "../../models/ExpenseItem";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-category-expenses',
  templateUrl: './category-expenses.component.html',
  styleUrls: ['./category-expenses.component.css']
})
export class CategoryExpensesComponent implements OnInit {

  monthExpensesFromDB: ExpenseItem[] = [];
  showSpinner: boolean = true;
  categoryExpenses: ExpenseItem[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private expensesService: ExpensesService) {
  }

  ngOnInit(): void {
    this.expensesService.getExpensesByMonthAndYear(this.data.month, this.data.year).subscribe((expensesData: ExpenseItem[]) => {
      this.monthExpensesFromDB = expensesData
      this.showSpinner = false;
      this.initializeCategoryExpenses()
    })
  }

  initializeCategoryExpenses() {
    console.log(this.monthExpensesFromDB)

    this.categoryExpenses = this.monthExpensesFromDB.filter(expense => expense.categoryName == this.data.categoryName);
    console.log(this.categoryExpenses)
  }

  protected readonly faSpinner = faSpinner;
}
