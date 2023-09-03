import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpensesPageComponent } from './monthly-expenses-page.component';

describe('MonthlyExpensesPageComponent', () => {
  let component: MonthlyExpensesPageComponent;
  let fixture: ComponentFixture<MonthlyExpensesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyExpensesPageComponent]
    });
    fixture = TestBed.createComponent(MonthlyExpensesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
