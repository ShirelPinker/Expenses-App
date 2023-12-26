import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MonthlyExpensesPageComponent} from './components/monthly-expenses-page/monthly-expenses-page.component';
import {HttpClientModule} from "@angular/common/http";
import { AddMonthlyExpensesFormPageComponent } from './components/add-monthly-expenses-form-page/add-monthly-expenses-form-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsPageComponent } from './components/charts-page/charts-page.component';
import { NgChartsModule } from 'ng2-charts';
import { CategoryExpensesComponent } from './components/category-expenses/category-expenses.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';
import { FinancialActivitiesPageComponent } from './components/financial-activities-page/financial-activities-page.component';
import { FinancialsDisplayComponent } from './components/financials-display/financials-display.component';
import { FinancialsFormComponent } from './components/financials-form/financials-form.component';
import { ChartExpensesByMonthComponent } from './components/chart-expenses-by-month/chart-expenses-by-month.component';
import { ChartExpensesByCategoryComponent } from './components/chart-expenses-by-category/chart-expenses-by-category.component';


@NgModule({
  declarations: [
    AppComponent,
    MonthlyExpensesPageComponent,
    AddMonthlyExpensesFormPageComponent,
    NavbarComponent,
    ChartsPageComponent,
    CategoryExpensesComponent,
    ExpenseItemComponent,
    FinancialActivitiesPageComponent,
    FinancialsDisplayComponent,
    FinancialsFormComponent,
    ChartExpensesByMonthComponent,
    ChartExpensesByCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgChartsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
