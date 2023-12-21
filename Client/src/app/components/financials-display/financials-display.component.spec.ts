import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsDisplayComponent } from './financials-display.component';

describe('FinancialsDisplayComponent', () => {
  let component: FinancialsDisplayComponent;
  let fixture: ComponentFixture<FinancialsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialsDisplayComponent]
    });
    fixture = TestBed.createComponent(FinancialsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
