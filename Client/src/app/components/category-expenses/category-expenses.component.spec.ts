import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryExpensesComponent } from './category-expenses.component';

describe('CategoryExpensesComponent', () => {
  let component: CategoryExpensesComponent;
  let fixture: ComponentFixture<CategoryExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryExpensesComponent]
    });
    fixture = TestBed.createComponent(CategoryExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
