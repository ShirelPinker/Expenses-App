import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ExpensesService} from "../../services/expenses.service";
import {FinancialActivitiesService} from "../../services/financialActivities.service";
import {FinancialActivitiesTypes} from "../../models/FinancialActivitiesTypesEnum";
import {FinancialActivitiesChangesService} from "../../services/financial-activities-changes.service";
import {FinancialActivity} from "../../models/FinancialActivity";
import {tap} from "rxjs";

@Component({
  selector: 'app-financials-display',
  templateUrl: './financials-display.component.html',
  styleUrls: ['./financials-display.component.css']
})
export class FinancialsDisplayComponent implements OnChanges, OnInit {
  @Input() year: number | null = null;
  @Input() month: string | null = null;
  expensesTotal: number;
  totalIncome: number;
  totalDeposit: number;
  totalInvestment: number;
  totalCrypto: number;
  balance: number;
  isShow: boolean = false;

  constructor(private expensesService: ExpensesService, private financialActivitiesService: FinancialActivitiesService,
              private financialActivitiesChangesService: FinancialActivitiesChangesService) {
  }

  ngOnInit() {
    this.financialActivitiesChangesService.getAddedFinancialActivity().subscribe(
      (addedFinancialActivity) => this.onAddedFinancialActivity(addedFinancialActivity)
    )
  }

  ngOnChanges() {
    this.isShow = false;
    this.initializeExpensesTotal()
    // this.initializeFinancialActivities()
  }

  initializeExpensesTotal() {
    this.expensesTotal = 0;
    this.expensesService.getExpensesByMonthAndYear(this.month, this.year).pipe(tap((expenses) => {
      for (let expense of expenses) {
        this.expensesTotal += expense.amount
      }
    })).subscribe(
      () => {
        this.initializeFinancialActivities()
        this.isShow = true
      }
    )
  }

  initializeFinancialActivities() {
    this.totalIncome = 0;
    this.totalDeposit = 0;
    this.totalInvestment = 0;
    this.totalCrypto = 0;
    this.financialActivitiesService.getFinancialActivitiesService(this.month, this.year).subscribe(
      (financialActivities) => {
        for (let financialActivity of financialActivities) {
          this.updateRelevantFinancial(financialActivity)
        }
        this.calcBalance()
      }
    )
  }

  updateRelevantFinancial(financialActivity: FinancialActivity) {
    if (financialActivity.type == FinancialActivitiesTypes.Income) {
      this.totalIncome += financialActivity.amount
    } else if (financialActivity.type == FinancialActivitiesTypes.Deposit) {
      this.totalDeposit += financialActivity.amount
    } else if (financialActivity.type == FinancialActivitiesTypes.Investment) {
      this.totalInvestment += financialActivity.amount
    } else if (financialActivity.type == FinancialActivitiesTypes.Crypto) {
      this.totalCrypto += financialActivity.amount
    }
  }

  calcBalance() {
    this.balance = this.totalIncome - this.expensesTotal;
  }

  onAddedFinancialActivity(addedFinancialActivity: FinancialActivity) {
    this.updateRelevantFinancial(addedFinancialActivity);
    this.calcBalance()
  }

}
