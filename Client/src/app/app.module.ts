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


@NgModule({
  declarations: [
    AppComponent,
    MonthlyExpensesPageComponent,
    AddMonthlyExpensesFormPageComponent,
    NavbarComponent,
    ExpenseChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
