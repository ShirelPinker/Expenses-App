import {Component, OnInit} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {CategoriesService} from "../../services/categories.service";
import {Month} from "../../models/MonthsEnum";
import {Category} from "../../models/Category";
import {ExpenseItem} from "../../models/ExpenseItem";
import {FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-monthly-expenses-form-page',
  templateUrl: './add-monthly-expenses-form-page.component.html',
  styleUrls: ['./add-monthly-expenses-form-page.component.css']
})
export class AddMonthlyExpensesFormPageComponent implements OnInit{
  monthsOptions: Month[] = [];
  categories: Category[] =[]
  month: string=''
  expenseForm:FormGroup;

  constructor(private expensesService: ExpensesService, private categoriesService: CategoriesService, private formBuilder:FormBuilder) {
    this.expenseForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.setForm()
    this.month = this.getMonthAsString()
    this.categoriesService.getCategories().subscribe((categoriesList:Category[]) => {
      this.categories=categoriesList
    }
  )
    this.monthsOptions = Object.values(Month);

  }


  getMonthAsString() {
    const today = new Date();
    const thisMonth = new Date(today);
    thisMonth.setMonth(today.getMonth());

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return monthNames[thisMonth.getMonth()];
  }
  setForm() {
    this.expenseForm = this.formBuilder.group({
      categoryId: [null],
      amount: 0,
      year: 2023
    });

  }
  submit(){
    console.log(this.expenseForm.value)
    const newExpenseDetails = {
      ...this.expenseForm.value,
      month:this.month
    }

    this.expensesService.addExpense(newExpenseDetails).subscribe()
  }

}
