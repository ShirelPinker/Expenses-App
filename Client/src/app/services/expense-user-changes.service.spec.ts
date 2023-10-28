import { TestBed } from '@angular/core/testing';

import { ExpenseUserChangesService } from './expense-user-changes.service';

describe('ExpenseUserChangesService', () => {
  let service: ExpenseUserChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseUserChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
