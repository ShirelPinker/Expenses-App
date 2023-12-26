import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FinancialActivitiesService} from "../../services/financialActivities.service";
import {FinancialActivity} from "../../models/FinancialActivity";
import {Months} from "../../models/MonthsEnum";
import {FinancialActivitiesTypes} from "../../models/FinancialActivitiesTypesEnum";
import {FinancialActivitiesChangesService} from "../../services/financial-activities-changes.service";


interface financialsForm {
  type: FormControl<FinancialActivitiesTypes | null>;
  amount: FormControl<number | null>;
}

@Component({
  selector: 'app-financials-form',
  templateUrl: './financials-form.component.html',
  styleUrls: ['./financials-form.component.css']
})
export class FinancialsFormComponent {
  @Input() year: number | null = null;
  @Input() month: string | null = null;

  financialsForm: FormGroup<financialsForm>;

  constructor(private formBuilder: FormBuilder, private financialActivitiesService: FinancialActivitiesService,
              private financialActivitiesChangesService: FinancialActivitiesChangesService) {
    this.financialsForm = this.formBuilder.group<financialsForm>({
      type: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    });
  }

  submit() {
    const newMonthFinancialActivities = {
      year: this.year,
      month: this.month,
      amount: this.financialsForm.get('amount')!.value,
      type: this.financialsForm.get('type')!.value
    }
    this.financialActivitiesService.addMonthFinancials(newMonthFinancialActivities as FinancialActivity).subscribe(() => {
        this.financialsForm.controls.type.reset()
        this.financialsForm.controls.amount.reset()
        this.financialActivitiesChangesService.onFinancialActivityAdded(newMonthFinancialActivities)

      }
    )
  }

  protected readonly Months = Months;
  protected readonly Object = Object;
  protected readonly FinancialActivitiesTypes = FinancialActivitiesTypes;
}
