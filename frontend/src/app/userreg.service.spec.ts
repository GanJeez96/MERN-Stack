import { TestBed, inject } from '@angular/core/testing';

import { UserregService } from './userreg.service';

describe('UserregService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserregService]
    });
  });

  it('should be created', inject([UserregService], (service: UserregService) => {
    expect(service).toBeTruthy();
  }));
});
