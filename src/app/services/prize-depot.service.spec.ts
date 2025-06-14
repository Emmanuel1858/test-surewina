import { TestBed } from '@angular/core/testing';

import { PrizeDepotService } from './prize-depot.service';

describe('PrizeDepotService', () => {
  let service: PrizeDepotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrizeDepotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
