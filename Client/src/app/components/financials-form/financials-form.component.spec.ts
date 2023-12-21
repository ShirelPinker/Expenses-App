import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsFormComponent } from './financials-form.component';

describe('SavingsFormComponent', () => {
  let component: FinancialsFormComponent;
  let fixture: ComponentFixture<FinancialsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialsFormComponent]
    });
    fixture = TestBed.createComponent(FinancialsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
