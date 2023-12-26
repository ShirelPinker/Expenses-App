import {Component, OnInit} from '@angular/core';
import {Months} from "../../models/MonthsEnum";
import {ExpensesService} from "../../services/expenses.service";
import {ExpenseItem} from "../../models/ExpenseItem";
import {Chart} from "chart.js";

@Component({
  selector: 'app-charts-page',
  templateUrl: './charts-page.component.html',
  styleUrls: ['./charts-page.component.css']
})

export class ChartsPageComponent {

}
