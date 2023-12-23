import {Component} from '@angular/core';
import {Months} from "../../models/MonthsEnum";

@Component({
  selector: 'app-financial-activities-page',
  templateUrl: './financial-activities-page.component.html',
  styleUrls: ['./financial-activities-page.component.css']
})
export class FinancialActivitiesPageComponent {
  selectedMonth: string;
  selectedYear: number;

  constructor() {
    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = Object.keys(Months)[new Date().getMonth() - 1]
  }

  protected readonly Object = Object;
  protected readonly Months = Months;
}
