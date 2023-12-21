import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FinancialActivitiesService} from "../../services/financialActivities.service";
import {NewMonthFinancialActivities} from "../../models/NewMonthFinancialActivities";
import {Months} from "../../models/MonthsEnum";
import {FinancialActivitiesTypes} from "../../models/FinancialActivitiesTypesEnum";


interface financialsForm {
  type: FormControl<FinancialActivitiesTypes | null>;
  amount: FormControl<number | null>;
  year: FormControl<number>;
  month: FormControl<string>;
}

@Component({
  selector: 'app-financials-form',
  templateUrl: './financials-form.component.html',
  styleUrls: ['./financials-form.component.css']
})
export class FinancialsFormComponent {
  financialsForm: FormGroup<financialsForm>;

  constructor(private formBuilder: FormBuilder, private financialActivitiesService: FinancialActivitiesService) {
    this.financialsForm = this.formBuilder.group<financialsForm>({
      type: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      year: new FormControl(new Date().getFullYear(), {nonNullable: true, validators: [Validators.required]}),
      month: new FormControl(Object.keys(Months)[new Date().getMonth() - 1], {
        nonNullable: true,
        validators: [Validators.required]
      }),
    });
  }

  submit() {
    this.financialActivitiesService.addMonthFinancials(this.financialsForm.value as NewMonthFinancialActivities).subscribe(() => {
        this.financialsForm.controls.type.reset()
        this.financialsForm.controls.amount.reset()


      }
    )
  }

  protected readonly Months = Months;
  protected readonly Object = Object;
  protected readonly FinancialActivitiesTypes = FinancialActivitiesTypes;
}
