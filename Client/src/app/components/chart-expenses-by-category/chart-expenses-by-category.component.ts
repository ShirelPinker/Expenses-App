import {Component, OnInit} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {ExpenseItem} from "../../models/ExpenseItem";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/Category";
import {Observable, switchMap, tap} from "rxjs";
import {Chart} from "chart.js";
import {Months} from "../../models/MonthsEnum";

@Component({
  selector: 'app-chart-expenses-by-category',
  templateUrl: './chart-expenses-by-category.component.html',
  styleUrls: ['./chart-expenses-by-category.component.css']
})
export class ChartExpensesByCategoryComponent implements OnInit {
  year: number = new Date().getFullYear()
  expensesFromDB: ExpenseItem[] = [];
  public chart: any;
  categories: Category[] = [];
  selectedCategory: string | null = null;
  categoryTotalByMonthData: number[] = [];

  constructor(private expensesService: ExpensesService, private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().pipe(
      tap((categories) => {
        this.categories = categories;
        this.selectedCategory = this.categories[0].name;
      }),
      switchMap(() => this.expensesService.getExpensesByYear(this.year))
    ).subscribe((expensesData: ExpenseItem[]) => {
      this.expensesFromDB = expensesData
      this.initializeChart();
    });
  }

  initializeChart() {
    this.initializeCategoryData();
    this.createChart();
  }

  initializeCategoryData() {
    const categoryTotalByMonth={}
    this.categoryTotalByMonthData=[]
    for (let month in Months) {
      categoryTotalByMonth[month] = 0;
    }
    for (let expense of this.expensesFromDB) {
      if (expense.categoryName == this.selectedCategory) {
        categoryTotalByMonth[expense.month] += expense.amount
      }
    }
    for(let month in categoryTotalByMonth){
      this.categoryTotalByMonthData.push(categoryTotalByMonth[month])
    }
  }

  onCategoryChange() {
    this.chart.destroy()
    this.initializeChart()
  }

  onYearChanged() {
    this.chart.destroy()
    this.expensesFromDB = [];
    this.expensesService.getExpensesByYear(this.year).subscribe((expensesData: ExpenseItem[]) => {
      this.expensesFromDB = expensesData
      this.initializeChart();
    });
  }

  createChart() {
    this.chart = new Chart("ExpensesByCategoryChart", {
      type: 'bar',
      data: {
        labels: Object.keys(Months),
        datasets: [
          {
            data: this.categoryTotalByMonthData,
            backgroundColor: 'purple'
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
            text: 'Category Expenses by Month',
            font: {
              size: 16
            }
          }
        },
      }

    });
  }

}
