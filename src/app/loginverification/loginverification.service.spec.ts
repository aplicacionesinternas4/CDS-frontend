import { TestBed, inject } from '@angular/core/testing';

import { LoginverificationService } from './loginverification.service';

describe('LoginverificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginverificationService]
    });
  });

  it('should be created', inject([LoginverificationService], (service: LoginverificationService) => {
    expect(service).toBeTruthy();
  }));
});
