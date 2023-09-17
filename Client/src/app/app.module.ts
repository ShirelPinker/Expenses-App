import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MonthlyExpensesPageComponent} from './components/monthly-expenses-page/monthly-expenses-page.component';
import {HttpClientModule} from "@angular/common/http";
import { AddMonthlyExpensesFormPageComponent } from './components/add-monthly-expenses-form-page/add-monthly-expenses-form-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthlyExpensesPageComponent,
    AddMonthlyExpensesFormPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
