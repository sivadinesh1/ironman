import { TestBed } from '@angular/core/testing';

import { BuyPacksService } from './buy-packs.service';

describe('BuyPacksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyPacksService = TestBed.get(BuyPacksService);
    expect(service).toBeTruthy();
  });
});
