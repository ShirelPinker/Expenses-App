import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MonthlyExpensesPageComponent} from "./components/monthly-expenses-page/monthly-expenses-page.component";
import {
  AddMonthlyExpensesFormPageComponent
} from "./components/add-monthly-expenses-form-page/add-monthly-expenses-form-page.component";
import {ExpenseChartComponent} from "./components/expenses-chart/expenses-chart.component";
import {SavingsPageComponent} from "./components/savings-page/savings-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MonthlyExpensesPageComponent },
  { path: 'add', component: AddMonthlyExpensesFormPageComponent },
  { path: 'savings', component: SavingsPageComponent },
  { path: 'stats', component: ExpenseChartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
