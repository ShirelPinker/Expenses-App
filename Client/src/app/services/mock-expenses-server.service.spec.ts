import { TestBed } from '@angular/core/testing';

import { MockExpensesServerService } from './mock-expenses-server.service';

describe('MockExpensesServerService', () => {
  let service: MockExpensesServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockExpensesServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
