import {Component, OnInit} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {CategoriesService} from "../../services/categories.service";
import {Months} from "../../models/MonthsEnum";
import {Category} from "../../models/Category";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-monthly-expenses-form-page',
  templateUrl: './add-monthly-expenses-form-page.component.html',
  styleUrls: ['./add-monthly-expenses-form-page.component.css']
})
export class AddMonthlyExpensesFormPageComponent implements OnInit {
  Months = Months;
  categories$: Observable<Category[]>
  expenseForm: FormGroup;
  faSpinner = faSpinner;

  constructor(private expensesService: ExpensesService, private categoriesService: CategoriesService, private formBuilder: FormBuilder) {
    this.expenseForm = this.formBuilder.group({});
    this.categories$ = this.categoriesService.getCategories()
  }

  ngOnInit(): void {
    this.setForm()
    // this.expenseForm.valueChanges.subscribe(form => console.log(form))
  }

  setForm() {
    this.expenseForm = this.formBuilder.group({
      categoryId: [null],
      amount: null,
      year: new Date().getFullYear(),
      month: [Object.keys(Months)[new Date().getMonth()]]
    });
  }

  submit() {
    this.expensesService.addExpense(this.expenseForm.value).subscribe()
  }

  protected readonly Object = Object;
}
