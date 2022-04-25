import { TestBed } from '@angular/core/testing';

import { HandlingService } from './error.handling.service';

describe('HandlingService', () => {
  let service: HandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
