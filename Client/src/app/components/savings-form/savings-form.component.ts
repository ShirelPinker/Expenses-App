import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SavingsService} from "../../services/savings.service";
import {NewMonthSavings} from "../../models/NewMonthSavings";
import {Months} from "../../models/MonthsEnum";


interface savingsForm {
  incomeAmount: FormControl<number | null>;
  investmentAmount: FormControl<number | null>;
  depositAmount: FormControl<number | null>;
  cryptoAmount: FormControl<number | null>;
  year: FormControl<number>;
  month: FormControl<string>;
}

@Component({
  selector: 'app-savings-form',
  templateUrl: './savings-form.component.html',
  styleUrls: ['./savings-form.component.css']
})
export class SavingsFormComponent {
  savingsForm: FormGroup<savingsForm>;

  constructor(private formBuilder: FormBuilder, private savingsService: SavingsService) {
    this.savingsForm = this.formBuilder.group<savingsForm>({
      incomeAmount: new FormControl(null, [Validators.required]),
      investmentAmount: new FormControl(null, [Validators.required]),
      depositAmount: new FormControl(null, [Validators.required]),
      cryptoAmount: new FormControl(null, [Validators.required]),
      year: new FormControl(new Date().getFullYear(), {nonNullable: true, validators: [Validators.required]}),
      month: new FormControl(Object.keys(Months)[new Date().getMonth() - 1], {
        nonNullable: true,
        validators: [Validators.required]
      }),
    });
  }

  submit() {
    this.savingsService.addMonthSavings(this.savingsForm.value as NewMonthSavings).subscribe(() => {
        this.savingsForm.controls.incomeAmount.reset()
        this.savingsForm.controls.investmentAmount.reset()
        this.savingsForm.controls.depositAmount.reset()
        this.savingsForm.controls.cryptoAmount.reset()

      }
    )
  }

  protected readonly Months = Months;
  protected readonly Object = Object;
}
