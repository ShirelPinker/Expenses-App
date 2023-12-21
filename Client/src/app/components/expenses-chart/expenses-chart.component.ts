import {Component, OnInit} from '@angular/core';
import {Months} from "../../models/MonthsEnum";
import {ExpensesService} from "../../services/expenses.service";
import {ExpenseItem} from "../../models/ExpenseItem";
import {Chart} from "chart.js";

@Component({
  selector: 'app-expenses-chart',
  templateUrl: './expenses-chart.component.html',
  styleUrls: ['./expenses-chart.component.css']
})

export class ExpenseChartComponent implements OnInit {
  expensesFromDB: ExpenseItem[] = [];
  public chart: any;
  dataByMonth: number[] = []
  year: number = new Date().getFullYear()

  constructor(private expensesService: ExpensesService) {
  }

  ngOnInit() {
    this.initializeMonthlyExpensesChart()
  }

  initializeMonthlyExpensesChart() {
    this.expensesService.getExpensesByYear(this.year)
      .subscribe((expensesData: ExpenseItem[]) => {
        this.expensesFromDB = expensesData
        this.initializeMonthsTotals();
        this.createChart();
      })
  }

  initializeMonthsTotals() {
    type StringKeyNumberValueObject = { [key: string]: number };
    const monthsTotalExpenses: StringKeyNumberValueObject = {}
    for (const expense of this.expensesFromDB) {
      if (monthsTotalExpenses[expense.month]) {
        monthsTotalExpenses[expense.month] += expense.amount
      } else {
        monthsTotalExpenses[expense.month] = expense.amount
      }
    }
    for (const month of Object.keys(Months)) {
      this.dataByMonth.push(monthsTotalExpenses[month])
    }
  }

  onYearChanged() {
    this.dataByMonth=[];
    this.expensesFromDB=[]
    this.initializeMonthlyExpensesChart()
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: Object.keys(Months),
        datasets: [
          {
            label: "Monthly Expenses",
            data: this.dataByMonth,
            backgroundColor: 'blue'
          },

        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
}
