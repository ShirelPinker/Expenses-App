import { TestBed } from '@angular/core/testing';

import { FinancialActivitiesService } from './financialActivities.service';

describe('FinancialActivitiesService', () => {
  let service: FinancialActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
