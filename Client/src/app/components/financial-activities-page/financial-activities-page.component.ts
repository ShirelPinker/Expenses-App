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
    const {year, month} = this.initializeDate()
    this.selectedYear = year;
    this.selectedMonth = month
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
  protected readonly Object = Object;
  protected readonly Months = Months;
}
