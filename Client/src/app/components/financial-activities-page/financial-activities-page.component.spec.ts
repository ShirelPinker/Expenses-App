import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsPageComponent } from './financial-activities-page.component';

describe('SavingsPageComponent', () => {
  let component: SavingsPageComponent;
  let fixture: ComponentFixture<SavingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsPageComponent]
    });
    fixture = TestBed.createComponent(SavingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
