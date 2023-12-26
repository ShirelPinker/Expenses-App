import {Component, OnInit} from '@angular/core';
import {ExpenseItem} from "../../models/ExpenseItem";
import {ExpensesService} from "../../services/expenses.service";
import {Months} from "../../models/MonthsEnum";
import {Chart} from "chart.js";

@Component({
  selector: 'app-chart-expenses-by-month',
  templateUrl: './chart-expenses-by-month.component.html',
  styleUrls: ['./chart-expenses-by-month.component.css']
})
export class ChartExpensesByMonthComponent implements OnInit {
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
    this.chart.destroy()
    this.dataByMonth = [];
    this.expensesFromDB = []
    this.initializeMonthlyExpensesChart()
  }

  createChart() {
    this.chart = new Chart("ExpensesByMonthChart", {
      type: 'bar',
      data: {
        labels: Object.keys(Months),
        datasets: [
          {
            data: this.dataByMonth,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true,
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Total expenses by Month',
            font: {
              size: 16
            }
          }
        },
      }

    });
  }
}
