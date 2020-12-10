import { TestBed } from '@angular/core/testing';

import { ProductShortDescriptionService } from './product-short-description.service';

describe('ProductShortDescriptionService', () => {
  let service: ProductShortDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductShortDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
