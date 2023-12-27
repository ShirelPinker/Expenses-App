import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MonthlyExpensesPageComponent} from "./components/monthly-expenses-page/monthly-expenses-page.component";
import {
  AddMonthlyExpensesFormPageComponent
} from "./components/add-monthly-expenses-form-page/add-monthly-expenses-form-page.component";
import {ChartsPageComponent} from "./components/charts-page/charts-page.component";
import {FinancialActivitiesPageComponent} from "./components/financial-activities-page/financial-activities-page.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MonthlyExpensesPageComponent },
  { path: 'add', component: AddMonthlyExpensesFormPageComponent },
  { path: 'financials', component: FinancialActivitiesPageComponent },
  { path: 'stats', component: ChartsPageComponent },
  { path: 'admin', component: AdminPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
