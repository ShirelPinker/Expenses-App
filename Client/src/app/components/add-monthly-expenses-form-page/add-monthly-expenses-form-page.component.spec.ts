import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthlyExpensesFormPageComponent } from './add-monthly-expenses-form-page.component';

describe('AddMonthlyExpensesFormPageComponent', () => {
  let component: AddMonthlyExpensesFormPageComponent;
  let fixture: ComponentFixture<AddMonthlyExpensesFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMonthlyExpensesFormPageComponent]
    });
    fixture = TestBed.createComponent(AddMonthlyExpensesFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
