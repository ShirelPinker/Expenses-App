import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MonthlyExpensesPageComponent} from "./components/monthly-expenses-page/monthly-expenses-page.component";
import {
  AddMonthlyExpensesFormPageComponent
} from "./components/add-monthly-expenses-form-page/add-monthly-expenses-form-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MonthlyExpensesPageComponent },
  { path: 'add', component: AddMonthlyExpensesFormPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
