import { TestBed } from '@angular/core/testing';

import { JeuDeLaVieService } from './jeu-de-la-vie.service';

describe('JeuDeLaVieService', () => {
  let service: JeuDeLaVieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JeuDeLaVieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
