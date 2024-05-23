import { TestBed } from '@angular/core/testing';

import { CelulasService } from './celulas.service';

describe('CelulasService', () => {
  let service: CelulasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelulasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
