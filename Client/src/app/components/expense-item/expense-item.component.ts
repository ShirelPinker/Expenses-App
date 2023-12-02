import {Component, Inject, Input} from '@angular/core';
import {faSpinner, faTrash, faPencil} from "@fortawesome/free-solid-svg-icons";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ExpenseUserChangesService} from "../../services/expense-user-changes.service";
import {ExpensesService} from "../../services/expenses.service";
import {UpdatedExpense} from "../../models/UpdatedExpense";
import {ExpenseItem} from "../../models/ExpenseItem";

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.css']
})
export class ExpenseItemComponent {
  @Input() expense: ExpenseItem = {} as ExpenseItem;
  faTrash = faTrash;
  faPencil = faPencil;
  editMode = false;

  constructor(private expenseUserChangesService: ExpenseUserChangesService, private expensesService: ExpensesService) {
  }

  onDeleteExpenseClicked() {
    this.expensesService.deleteExpense(this.expense.id).subscribe(
      {
        next: () => {
          this.expenseUserChangesService.onDeleteExpenseClicked(this.expense.id)
        },
        error: () => console.log('error-did not delete')
      }
    )
  }

  onEditClicked() {
    this.editMode = true;

  }

  onSubmitClicked() {
    const updatedExpense : UpdatedExpense = {
      amount: this.expense.amount,
      description: this.expense.description
    }
    this.expensesService.updateExpense(this.expense.id, updatedExpense).subscribe(
      {
        next: () => {
          this.expenseUserChangesService.onExpenseUpdated({id: this.expense.id, ...updatedExpense})
        },
        error: () => console.log('error-did not edit')
      }
    )
    this.editMode = false
  }

  onCancelClicked() {
    this.editMode = false

  }
}
