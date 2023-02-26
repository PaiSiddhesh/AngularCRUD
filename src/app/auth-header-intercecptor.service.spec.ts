import { TestBed } from '@angular/core/testing';

import { AuthHeaderIntercecptorService } from './auth-header-intercecptor.service';

describe('AuthHeaderIntercecptorService', () => {
  let service: AuthHeaderIntercecptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHeaderIntercecptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
