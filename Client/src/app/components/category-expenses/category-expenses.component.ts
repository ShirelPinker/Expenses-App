import {Component, Inject, OnInit} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {ExpenseItem} from "../../models/ExpenseItem";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private expenseUserChangesService: ExpenseUserChangesService, private expensesService: ExpensesService) {
  }

  ngOnInit(): void {
    this.expensesService.getExpensesByMonthAndYear(this.data.month, this.data.year).subscribe((expensesData: ExpenseItem[]) => {
      this.monthExpensesFromDB = expensesData
      this.showSpinner = false;
      this.initializeCategoryExpenses()
      this.expenseUserChangesService.getDeletedId().subscribe(
        (deletedId) => this.onDeleteExpense(deletedId)
      )
    })
  }

  initializeCategoryExpenses() {
    this.categoryExpenses = this.monthExpensesFromDB.filter(expense => expense.categoryName == this.data.categoryName);
  }


  onDeleteExpense(deletedId: number) {
    this.monthExpensesFromDB = this.monthExpensesFromDB.filter(item => item.id != deletedId);
    this.initializeCategoryExpenses()
  }



  protected readonly faSpinner = faSpinner;
}
