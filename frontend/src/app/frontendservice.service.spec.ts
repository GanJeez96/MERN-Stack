import { TestBed, inject } from '@angular/core/testing';

import { FrontendserviceService } from './frontendservice.service';

describe('FrontendserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrontendserviceService]
    });
  });

  it('should be created', inject([FrontendserviceService], (service: FrontendserviceService) => {
    expect(service).toBeTruthy();
  }));
});
