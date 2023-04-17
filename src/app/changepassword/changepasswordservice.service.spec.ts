import { TestBed, inject } from '@angular/core/testing';

import { ChangepasswordserviceService } from './changepasswordservice.service';

describe('ChangepasswordserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangepasswordserviceService]
    });
  });

  it('should be created', inject([ChangepasswordserviceService], (service: ChangepasswordserviceService) => {
    expect(service).toBeTruthy();
  }));
});
