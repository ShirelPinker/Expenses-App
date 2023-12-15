import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsDisplayComponent } from './savings-display.component';

describe('SavingsDisplayComponent', () => {
  let component: SavingsDisplayComponent;
  let fixture: ComponentFixture<SavingsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsDisplayComponent]
    });
    fixture = TestBed.createComponent(SavingsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
