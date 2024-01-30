import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {CategoriesService} from "../../services/categories.service";
import {Months} from "../../models/MonthsEnum";
import {Category} from "../../models/Category";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {NewExpenseItem} from "../../models/NewExpenseItem";

interface ExpenseForm {
  categoryId: FormControl<number | null>;
  amount: FormControl<number | null>;
  year: FormControl<number>;
  month: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-add-monthly-expenses-form-page',
  templateUrl: './add-monthly-expenses-form-page.component.html',
  styleUrls: ['./add-monthly-expenses-form-page.component.css']
})


export class AddMonthlyExpensesFormPageComponent implements AfterViewInit {
  Months = Months;
  categories$: Observable<Category[]>
  expenseForm: FormGroup<ExpenseForm>;
  faSpinner = faSpinner;

  constructor(
    private expensesService: ExpensesService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef
  ) {
    const {year, month} = this.initializeDate()
    this.expenseForm = this.formBuilder.group<ExpenseForm>({
      categoryId: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      description: new FormControl(),
      year: new FormControl(year, {nonNullable: true, validators: [Validators.required]}),
      month: new FormControl(month, {nonNullable: true, validators: [Validators.required]}),
    });
    this.categories$ = this.categoriesService.getCategories()
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

  ngAfterViewInit(): void {
    this.categories$.subscribe(() => this.focusOnCategories())
  }

  submit() {
    this.expensesService.addExpense(this.expenseForm.value as NewExpenseItem).subscribe(() => {
      this.expenseForm.controls.categoryId.reset()
      this.expenseForm.controls.amount.reset()
      this.expenseForm.controls.description.reset()

      this.focusOnCategories();
    })
  }

  focusOnCategories() {
    const categoriesDropdown = this.elementRef.nativeElement.querySelector('#categories-dropdown');
    categoriesDropdown.focus()
  }

  protected readonly Object = Object;
}
