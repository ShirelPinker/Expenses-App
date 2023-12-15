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
import { ExpenseChartComponent } from './components/expenses-chart/expenses-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { CategoryExpensesComponent } from './components/category-expenses/category-expenses.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';
import { SavingsPageComponent } from './components/savings-page/savings-page.component';
import { SavingsDisplayComponent } from './components/savings-display/savings-display.component';
import { SavingsFormComponent } from './components/savings-form/savings-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MonthlyExpensesPageComponent,
    AddMonthlyExpensesFormPageComponent,
    NavbarComponent,
    ExpenseChartComponent,
    CategoryExpensesComponent,
    ExpenseItemComponent,
    SavingsPageComponent,
    SavingsDisplayComponent,
    SavingsFormComponent
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
