import {Component, Inject, Input, OnInit} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {ExpenseItem} from "../../models/ExpenseItem";
import {faSpinner, faTrash, faPencil} from "@fortawesome/free-solid-svg-icons";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {log10} from "chart.js/helpers";
import {ExpenseUserChangesService} from "../../services/expense-user-changes.service";

@Component({
  selector: 'app-category-expenses',
  templateUrl: './category-expenses.component.html',
  styleUrls: ['./category-expenses.component.css']
})
export class CategoryExpensesComponent implements OnInit {

  monthExpensesFromDB: ExpenseItem[] = [];
  showSpinner: boolean = true;
  categoryExpenses: ExpenseItem[] = []
  faTrash = faTrash;
  faPencil = faPencil;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private expenseUserChangesService: ExpenseUserChangesService, private expensesService: ExpensesService) {
  }

  ngOnInit(): void {
    this.expensesService.getExpensesByMonthAndYear(this.data.month, this.data.year).subscribe((expensesData: ExpenseItem[]) => {
      this.monthExpensesFromDB = expensesData
      this.showSpinner = false;
      this.initializeCategoryExpenses()
    })
  }

  initializeCategoryExpenses() {
    this.categoryExpenses = this.monthExpensesFromDB.filter(expense => expense.categoryName == this.data.categoryName);
  }


  onDeleteExpenseClicked(expenseId: number) {
    this.expensesService.deleteExpense(expenseId).subscribe(
      {
        next: () => {
          this.categoryExpenses = this.categoryExpenses.filter(item => item.id != expenseId);
          this.expenseUserChangesService.onDeleteExpenseClicked(expenseId)
        },
        error: () => console.log('error-did not delete')
      }
    )
  }


  protected readonly faSpinner = faSpinner;
}
